import React from 'react';

const getDotCount = spec => {
  let dots;
  /*
    Diff :-
    The +1 is to compensate incase of uneven slides
    eg:-
    {
      slideCount: 5,
      slidesToShow: 3,
      slidesToScroll: 3,
    }
    equation ends but being :- Math.ceil( ( 5 - 3 ) / 3 ) + 1
  */
  dots = Math.ceil((spec.slideCount - spec.slidesToShow) / spec.slidesToScroll) + 1
  return dots
}

export class Dots extends React.PureComponent {

  clickHandler(options, e) {
    e.preventDefault();
    this.props.clickHandler(options);
  }

  render() {
    const {
      slideCount,
      slidesToScroll,
      slidesToShow,
      currentSlide
    } = this.props

    let dotCount = getDotCount({
      slideCount,
      slidesToScroll,
      slidesToShow,
    })

    let dots = [];
    for ( let i = 0; i < dotCount; i++ ) {
      let className = currentSlide === i ? "slick-active": null;
      let dotOptions = {
        message: "dots",
        index: i,
        slidesToScroll,
        currentSlide,
      }
      let onClick = this.clickHandler.bind(this, dotOptions);
      dots = dots.concat(
        <li key={i} className={className}>
          { React.cloneElement(this.props.customPaging(i), { onClick }) }
        </li>
      )
    }
    return React.cloneElement(this.props.appendDots(dots), {
      className: this.props.dotsClass,
    })

  }
}