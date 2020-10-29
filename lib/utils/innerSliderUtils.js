"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTrackAnimateCSS = exports.changeSlide = exports.slideHandler = exports.getTotalSlides = exports.getTrackCSS = exports.getTrackLeft = exports.getHeight = exports.getWidth = exports.initializedState = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initializedState = function initializedState(spec) {
  var slideCount = _react["default"].Children.count(spec.children);

  var listNode = spec.listRef;
  var listWidth = Math.ceil(getWidth(listNode));
  var trackNode = spec.trackRef && spec.trackRef.node;
  var trackWidth = Math.ceil(getWidth(trackNode));
  var slideWidth;
  slideWidth = Math.ceil(listWidth / spec.slidesToShow);
  var slideHeight = listNode && getHeight(listNode.querySelector('[data-index="0"]'));
  var listHeight = slideHeight * spec.slidesToShow;
  var currentSlide = spec.currentSlide === undefined ? spec.initialSlide : spec.currentSlide;
  var state = {
    slideCount: slideCount,
    slideWidth: slideWidth,
    listWidth: listWidth,
    trackWidth: trackWidth,
    currentSlide: currentSlide,
    slideHeight: slideHeight,
    listHeight: listHeight
  };
  return state;
};

exports.initializedState = initializedState;

var getWidth = function getWidth(elem) {
  return elem && elem.offsetWidth || 0;
};

exports.getWidth = getWidth;

var getHeight = function getHeight(elem) {
  return elem && elem.offsetHeight || 0;
};

exports.getHeight = getHeight;

var getTrackLeft = function getTrackLeft(spec) {
  var slideIndex = spec.slideIndex,
      slideCount = spec.slideCount,
      slidesToShow = spec.slidesToShow,
      slidesToScroll = spec.slidesToScroll,
      slideWidth = spec.slideWidth,
      slideHeight = spec.slideHeight;
  var slideOffset = 0;
  var targetLeft;
  var slidesToOffset = 0;
  /*
    DIFF :-
    slideOffset - is the offset in pixels basically eg. 188px
    slidesToOffset - is the no. of slides to offset by. eg. 2
  */

  if (slideCount % slidesToScroll !== 0 && slideIndex + slidesToScroll > slideCount) {
    slidesToOffset = slidesToShow - slideCount % slidesToScroll;
  }

  slideOffset = slidesToOffset * slideWidth;
  console.log('>>> slide offset is :- ' + slidesToOffset);
  targetLeft = slideIndex * slideWidth * -1 + slideOffset;
  return targetLeft;
};

exports.getTrackLeft = getTrackLeft;

var getTrackCSS = function getTrackCSS(spec) {
  var trackWidth, trackHeight;
  trackWidth = getTotalSlides(spec) * spec.slideWidth;
  var style = {
    opacity: 1,
    transition: ""
  };
  var transform = "translate3d(" + spec.left + "px, 0px, 0px)";
  style = _objectSpread(_objectSpread({}, style), {}, {
    transform: transform
  });
  if (trackWidth) style.width = trackWidth;
  if (trackHeight) style.height = trackHeight;
  return style;
};

exports.getTrackCSS = getTrackCSS;

var getTotalSlides = function getTotalSlides(spec) {
  return spec.slideCount === 1 ? 1 : spec.slideCount;
};

exports.getTotalSlides = getTotalSlides;

var slideHandler = function slideHandler(spec) {
  var animating = spec.animating,
      infinite = spec.infinite,
      index = spec.index,
      slideCount = spec.slideCount,
      slidesToShow = spec.slidesToShow;
  if (animating) return {};
  var animationSlide = index,
      finalSlide,
      animationLeft,
      finalLeft;
  var state = {},
      nextState = {};
  var targetSlide = index;
  finalSlide = animationSlide;
  animationLeft = getTrackLeft(_objectSpread(_objectSpread({}, spec), {}, {
    slideIndex: animationSlide
  }));
  finalLeft = getTrackLeft(_objectSpread(_objectSpread({}, spec), {}, {
    slideIndex: finalSlide
  }));
  state = {
    animating: true,
    currentSlide: finalSlide,
    targetSlide: targetSlide,
    trackStyle: getTrackAnimateCSS(_objectSpread(_objectSpread({}, spec), {}, {
      left: animationLeft
    }))
  };
  nextState = _objectSpread(_objectSpread({}, state), {}, {
    animating: false,
    trackStyle: getTrackCSS(_objectSpread(_objectSpread({}, spec), {}, {
      left: finalLeft
    }))
  });
  return {
    state: state,
    nextState: nextState
  };
};

exports.slideHandler = slideHandler;

var changeSlide = function changeSlide(options) {
  var targetSlide;

  if (options.message === 'dots') {
    targetSlide = options.index * options.slidesToScroll;
  } else if (options.message === 'index') {
    targetSlide = Number(options.index);
  }

  return targetSlide;
};

exports.changeSlide = changeSlide;

var getTrackAnimateCSS = function getTrackAnimateCSS(spec) {
  var style = getTrackCSS(spec);
  style.transition = "transform " + spec.speed + "ms " + spec.cssEase;
  return style;
};

exports.getTrackAnimateCSS = getTrackAnimateCSS;