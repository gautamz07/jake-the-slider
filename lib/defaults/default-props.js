"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var defaultProps = {
  appendDots: function appendDots(dots) {
    return /*#__PURE__*/_react["default"].createElement("ul", {
      style: {
        'display': 'block'
      }
    }, dots);
  },
  autoplay: false,
  dots: false,
  infinite: false,
  slide: "div",
  slidesPerRow: 1,
  slidesToScroll: 1,
  slidesToShow: 1,
  speed: 500,
  useCSS: true,
  useTrasnform: true,
  vertical: false,
  cssEase: "ease",
  initialSlide: 0,
  rows: 1,
  dotsClass: "slick-dots",
  customPaging: function customPaging(i) {
    return /*#__PURE__*/_react["default"].createElement("button", null, i + 1);
  }
};
var _default = defaultProps;
exports["default"] = _default;