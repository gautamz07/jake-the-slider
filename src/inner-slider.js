
import React from 'react';
import initialState from './defaults/initial-state';
import { initializedState, getTrackLeft, getTrackCSS, changeSlide, slideHandler } from './utils/innerSliderUtils';
import { Track } from './track';
import { Dots } from './dots'

export class InnerSlider extends React.Component {
  constructor(props) {
    super(props);
    this.list = null;
    this.track = null;
    this.state = {
      ...initialState,
      currentSlide: this.props.initialSlide,
      slideCount: React.Children.count(this.props.children)
    }
    const ssrState = this.ssrInit();
    this.state = {
      ...this.state,
      ...ssrState
    }
  }
  listRefHandler = ref => this.list = ref
  trackRefHandler = ref => (this.track = ref);

  componentDidMount() {
    let spec = { listRef : this.list, trackRef : this.trackLeft ,...this.props }
    this.updateState(spec);
  }

  updateState = spec => {
    let updatedState = initializedState(spec);
    spec = { ...spec, ...updatedState, slideIndex: updatedState.currentSlide };
    // debugger
    let targetLeft = getTrackLeft(spec);
    // debugger
    spec = { ...spec, left: targetLeft };
    let trackStyle = getTrackCSS(spec);
    // debugger
    updatedState['trackStyle'] = trackStyle;

    /*
      NOTE `spec` is used internally but only 
      `updatedState` is used to setState not `spec`  
    */

    this.setState(updatedState);
  }

  ssrInit = () => {
    let childrenCount = React.Children.count(this.props.children);
    let slideCount = childrenCount;
    let trackWidth = (100 / this.props.slidesToShow) * slideCount;
    let slideWidth = 100/ slideCount;
    /*
      DIFF 
    */
    let trackLeft = (-slideWidth * (this.state.currentSlide) * trackWidth) / 100;
    let trackStyle = { width: trackWidth, left: trackLeft + '%' }
    // debugger
    return { slideWidth: slideWidth + '%', trackStyle: trackStyle }
  }

  slideHandler = (index) => {
    const { speed } = this.props;
    debugger

    let { state, nextState } = slideHandler({
      index,
      ...this.props,
      ...this.state,
      trackRef: this.track,
      useCSS: true
    });

    if (!state) return;

    if (this.animationEndClassback) {
      clearTimeout(this.animationEndCallback);
      delete this.animationEndCallBack;
    }

    this.setState( state, () => {
      if(!nextState) return;
      this.animationEndCallBack = setTimeout(() => {
        this.setState( nextState, () => {
          delete this.animationEndCallBack
        })
      }, speed );
    })

  }

  changeSlide = options => {
    const spec = { ...this.props, ...this.state }
    let targetSlide = changeSlide(options);
    // Diff why !== 0 ? below
    if (targetSlide !== 0 && !targetSlide) return
    this.slideHandler(targetSlide);
  }

  render() {
    let spec = { ...this.props, ...this.state }
    let listProps = { className: "slick-list" }
    const innerSliderProps = { className: "slick-slider slick-initialized" }

    var dots;
    if( this.props.dots ) {
      dots = <Dots {...spec} clickHandler={this.changeSlide} />
    }

    return (
      <div {...innerSliderProps}>
        <div ref={this.listRefHandler} {...listProps}>
          <Track ref={this.trackRefHandler} {...spec}>
            {this.props.children}
          </Track>
        </div>
        { dots }
      </div>
    )
  }

}