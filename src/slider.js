import React from 'react';
import defaultProps from './defaults/default-props'
import { InnerSlider } from './inner-slider';


class Slider extends React.Component {

  innerSliderRefHandler = ref => (this.InnerSlider = ref);

  componentDidMount() {
    // code removed
  }

  componentWillUnmount() {
    // code removed
  }


  render() {
    let settings = { ...defaultProps, ...this.props };
    // debugger
    let children = React.Children.toArray(this.props.children);

    let newChildren = [];

    for( 
      let i = 0; 
      i < children.length; 
      i += settings.rows * settings.slidesPerRow
    ) {
      let newSlide = [];
      // console.log(`%c LEVEL 1 LOOP ---> i value is ${i}`, 'background: red')
      for(
        let j = i;
        j < i + settings.rows * settings.slidesPerRow;
        j += settings.slidesPerRow
      ) {
        // console.log(`%c LEVEL 2 LOOP ---> j value is ${j}`, 'background: orange')
        let row = []
        for (let k = j; k < j + settings.slidesPerRow; k += 1) {
          // console.log(`%c LEVEL 3 LOOP ---> k value is ${k}` , 'background: skyblue')
          row.push(
            React.cloneElement( children[k], {
              key: 100 * i + 10 * j + k,
              style: {
                width: `${100/settings.slidesPerRow}%`,
                display: "inline-block"
              }
            })
          )
        }
        newSlide.push(<div key={10 * i + j}>{row}</div>)
      }
      newChildren.push(<div key={i}>{newSlide}</div>)
    }
    console.log('NEW CHILD')
    console.log(newChildren)
    return (
      <InnerSlider
        style={this.props.style}
        ref={this.innerSliderRefHandler}
        {...settings}
      >
        {newChildren}
      </InnerSlider>  
    )

  }

}

export default Slider