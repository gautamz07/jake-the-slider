

import React from "react";


const renderSlides = spec => {
  let slides = [];

  React.Children.forEach( spec.children, (elem, index) => {
    slides.push(
      React.cloneElement(elem, {
        key: "original" + index,
        tabIndex: "-1",
        "data-index": index,
        className: 'slick-slide',
        style: { outline: "none", ...(elem.props.style || {}), width : spec.slideWidth }
      })
    )
  });

  return slides;
}


export class Track extends React.PureComponent {
  node = null;

  handleRef = ref => {
    this.node = ref;
  }

  render() {
    const slides = renderSlides(this.props);
    return (
      <div
        ref={this.handleRef}
        className="slick-track"
        style={this.props.trackStyle}
      >
        {slides}
      </div>
    )
  }
}