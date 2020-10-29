import React from 'react'

let defaultProps = {
  appendDots: dots => <ul style={{ 'display': 'block' }}>{dots}</ul>,
  autoplay: false,
  dots: false,
  infinite: false,
  slide: "div",
  slidesPerRow: 1,
  slidesToScroll: 1,
  slidesToShow: 1,
  speed: 500,
  useCSS: true,
  useTrasnform:true,
  vertical: false,
  cssEase: "ease",
  initialSlide: 0,
  rows: 1,
  dotsClass: "slick-dots",
  customPaging: i => <button>{i + 1}</button>,
}

export default defaultProps