"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InnerSlider = void 0;

var _react = _interopRequireDefault(require("react"));

var _initialState = _interopRequireDefault(require("./defaults/initial-state"));

var _innerSliderUtils = require("./utils/innerSliderUtils");

var _track = require("./track");

var _dots = require("./dots");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var InnerSlider = /*#__PURE__*/function (_React$Component) {
  _inherits(InnerSlider, _React$Component);

  var _super = _createSuper(InnerSlider);

  function InnerSlider(props) {
    var _this;

    _classCallCheck(this, InnerSlider);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "listRefHandler", function (ref) {
      return _this.list = ref;
    });

    _defineProperty(_assertThisInitialized(_this), "trackRefHandler", function (ref) {
      return _this.track = ref;
    });

    _defineProperty(_assertThisInitialized(_this), "updateState", function (spec) {
      var updatedState = (0, _innerSliderUtils.initializedState)(spec);
      spec = _objectSpread(_objectSpread(_objectSpread({}, spec), updatedState), {}, {
        slideIndex: updatedState.currentSlide
      }); // debugger

      var targetLeft = (0, _innerSliderUtils.getTrackLeft)(spec); // debugger

      spec = _objectSpread(_objectSpread({}, spec), {}, {
        left: targetLeft
      });
      var trackStyle = (0, _innerSliderUtils.getTrackCSS)(spec); // debugger

      updatedState['trackStyle'] = trackStyle;
      /*
        NOTE `spec` is used internally but only 
        `updatedState` is used to setState not `spec`  
      */

      _this.setState(updatedState);
    });

    _defineProperty(_assertThisInitialized(_this), "ssrInit", function () {
      var childrenCount = _react["default"].Children.count(_this.props.children);

      var slideCount = childrenCount;
      var trackWidth = 100 / _this.props.slidesToShow * slideCount;
      var slideWidth = 100 / slideCount;
      /*
        DIFF 
      */

      var trackLeft = -slideWidth * _this.state.currentSlide * trackWidth / 100;
      var trackStyle = {
        width: trackWidth,
        left: trackLeft + '%'
      }; // debugger

      return {
        slideWidth: slideWidth + '%',
        trackStyle: trackStyle
      };
    });

    _defineProperty(_assertThisInitialized(_this), "slideHandler", function (index) {
      var speed = _this.props.speed;
      debugger;

      var _slideHandler = (0, _innerSliderUtils.slideHandler)(_objectSpread(_objectSpread(_objectSpread({
        index: index
      }, _this.props), _this.state), {}, {
        trackRef: _this.track,
        useCSS: true
      })),
          state = _slideHandler.state,
          nextState = _slideHandler.nextState;

      if (!state) return;

      if (_this.animationEndClassback) {
        clearTimeout(_this.animationEndCallback);
        delete _this.animationEndCallBack;
      }

      _this.setState(state, function () {
        if (!nextState) return;
        _this.animationEndCallBack = setTimeout(function () {
          _this.setState(nextState, function () {
            delete _this.animationEndCallBack;
          });
        }, speed);
      });
    });

    _defineProperty(_assertThisInitialized(_this), "changeSlide", function (options) {
      var spec = _objectSpread(_objectSpread({}, _this.props), _this.state);

      var targetSlide = (0, _innerSliderUtils.changeSlide)(options); // Diff why !== 0 ? below

      if (targetSlide !== 0 && !targetSlide) return;

      _this.slideHandler(targetSlide);
    });

    _this.list = null;
    _this.track = null;
    _this.state = _objectSpread(_objectSpread({}, _initialState["default"]), {}, {
      currentSlide: _this.props.initialSlide,
      slideCount: _react["default"].Children.count(_this.props.children)
    });

    var ssrState = _this.ssrInit();

    _this.state = _objectSpread(_objectSpread({}, _this.state), ssrState);
    return _this;
  }

  _createClass(InnerSlider, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var spec = _objectSpread({
        listRef: this.list,
        trackRef: this.trackLeft
      }, this.props);

      this.updateState(spec);
    }
  }, {
    key: "render",
    value: function render() {
      var spec = _objectSpread(_objectSpread({}, this.props), this.state);

      var listProps = {
        className: "slick-list"
      };
      var innerSliderProps = {
        className: "slick-slider slick-initialized"
      };
      var dots;

      if (this.props.dots) {
        dots = /*#__PURE__*/_react["default"].createElement(_dots.Dots, _extends({}, spec, {
          clickHandler: this.changeSlide
        }));
      }

      return /*#__PURE__*/_react["default"].createElement("div", innerSliderProps, /*#__PURE__*/_react["default"].createElement("div", _extends({
        ref: this.listRefHandler
      }, listProps), /*#__PURE__*/_react["default"].createElement(_track.Track, _extends({
        ref: this.trackRefHandler
      }, spec), this.props.children)), dots);
    }
  }]);

  return InnerSlider;
}(_react["default"].Component);

exports.InnerSlider = InnerSlider;