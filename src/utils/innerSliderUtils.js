
import React from 'react'

export const initializedState = spec => {
  let slideCount = React.Children.count(spec.children);
  const listNode = spec.listRef;

  let listWidth = Math.ceil(getWidth(listNode));
  const trackNode = spec.trackRef && spec.trackRef.node;
  let trackWidth = Math.ceil(getWidth(trackNode));
  let slideWidth;

  slideWidth = Math.ceil( listWidth / spec.slidesToShow);

  let slideHeight =
      listNode && getHeight(listNode.querySelector('[data-index="0"]'));

  let listHeight = slideHeight * spec.slidesToShow;
  let currentSlide =  
    spec.currentSlide === undefined ? spec.initialSlide : spec.currentSlide;

  let state = {
    slideCount, slideWidth, listWidth, trackWidth, currentSlide, slideHeight, listHeight 
  }
  return state;
}

export const getWidth = elem => {
  return (elem && elem.offsetWidth) || 0;
}

export const getHeight = elem => {
  return (elem && elem.offsetHeight) || 0;
}

export const getTrackLeft = spec => {
  const { 
    slideIndex, 
    slideCount, 
    slidesToShow, 
    slidesToScroll, 
    slideWidth, 
    slideHeight 
  } = spec;

  var slideOffset = 0;
  var targetLeft;
  
  let slidesToOffset = 0;

  /*
    DIFF :-
    slideOffset - is the offset in pixels basically eg. 188px
    slidesToOffset - is the no. of slides to offset by. eg. 2
  */
  if ( slideCount % slidesToScroll !== 0 && slideIndex + slidesToScroll > slideCount ) {
    slidesToOffset = slidesToShow - (slideCount % slidesToScroll);
  }
  slideOffset = slidesToOffset * slideWidth;
  console.log('>>> slide offset is :- ' + slidesToOffset)
  targetLeft = slideIndex * slideWidth * -1 + slideOffset;
  return targetLeft;
}



export const getTrackCSS = spec => {
  let trackWidth, trackHeight;

  trackWidth = getTotalSlides(spec) * spec.slideWidth;

  let style = { opacity: 1, transition: "" };
  let transform = "translate3d(" + spec.left + "px, 0px, 0px)"
  style = { ...style, transform };

  if (trackWidth) style.width = trackWidth;
  if (trackHeight) style.height = trackHeight;

  return style;
}

export const getTotalSlides = spec => {
  return spec.slideCount === 1 ? 1 : spec.slideCount;
}


export const slideHandler = spec => {
  const { 
    animating,
    infinite,
    index,
    slideCount,
    slidesToShow
  } = spec;

  if (animating) return {}
  let animationSlide = index, finalSlide, animationLeft, finalLeft; 
  let state = {}, nextState = {};

  const targetSlide = index;
  finalSlide = animationSlide;

  animationLeft = getTrackLeft({ ...spec, slideIndex: animationSlide })
  finalLeft = getTrackLeft({ ...spec, slideIndex: finalSlide })

  state = {
    animating: true,
    currentSlide: finalSlide,
    targetSlide,
    trackStyle: getTrackAnimateCSS({ ...spec, left: animationLeft })
  }

  nextState = {
    ...state,
    animating: false,
    trackStyle: getTrackCSS({ ...spec, left: finalLeft })
  }

  return { state, nextState }
}


export const changeSlide = (options) => {
  var targetSlide;
  if (options.message === 'dots') { targetSlide = options.index * options.slidesToScroll }
  else if (options.message === 'index') { targetSlide = Number(options.index) }
  return targetSlide;
}

export const getTrackAnimateCSS = spec => {
  let style = getTrackCSS(spec);
  style.transition = "transform " + spec.speed + "ms " + spec.cssEase;
  return style
}