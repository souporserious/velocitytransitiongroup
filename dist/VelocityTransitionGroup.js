(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("React"), require("Velocity"), require("velocity-animate/velocity.ui"));
	else if(typeof define === 'function' && define.amd)
		define(["React", "Velocity", "velocity-animate/velocity.ui"], factory);
	else if(typeof exports === 'object')
		exports["VelocityTransitionGroup"] = factory(require("React"), require("Velocity"), require("velocity-animate/velocity.ui"));
	else
		root["VelocityTransitionGroup"] = factory(root["React"], root["Velocity"], root["velocity-animate/velocity.ui"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_5__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "dist/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

	var React = __webpack_require__(1);
	var ReactTransitionGroup = React.addons.TransitionGroup;
	var VelocityTransitionGroupChild = __webpack_require__(2);

	var VelocityTransitionGroup = (function (_React$Component) {
	    function VelocityTransitionGroup(props) {
	        _classCallCheck(this, VelocityTransitionGroup);

	        _get(Object.getPrototypeOf(VelocityTransitionGroup.prototype), 'constructor', this).call(this, props);
	    }

	    _inherits(VelocityTransitionGroup, _React$Component);

	    _createClass(VelocityTransitionGroup, [{
	        key: '_wrapChild',
	        value: function _wrapChild(child) {
	            // see how we could do something like a click and wiggle a button
	            // maybe allow to do something like transitionEnter="fadeIn", calloutEnter="tada"
	            return React.createElement(
	                VelocityTransitionGroupChild,
	                {
	                    enter: this.props.enter,
	                    enterOptions: this.props.enterOptions,
	                    leave: this.props.leave,
	                    leaveOptions: this.props.leaveOptions,
	                    appear: this.props.appear,
	                    appearOptions: this.props.appearOptions,
	                    duration: this.props.duration,
	                    transitionHeight: this.props.transitionHeight,
	                    transitionChild: this.props.transitionChild
	                },
	                child
	            );
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return React.createElement(ReactTransitionGroup, _extends({}, this.props, { childFactory: this._wrapChild.bind(this) }));
	        }
	    }]);

	    return VelocityTransitionGroup;
	})(React.Component);

	// VelocityTransitionGroup.propTypes = {
	//     enter: React.PropTypes.string.isRequired, // obj
	//     leave: React.PropTypes.string,
	//     appear: React.PropTypes.oneOfType([
	//       React.PropTypes.string,
	//       React.PropTypes.bool
	//     ]),
	//     transitionHeight: React.PropTypes.bool
	// };

	VelocityTransitionGroup.defaultProps = {
	    transitionHeight: false
	};

	module.exports = VelocityTransitionGroup;

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x3, _x4, _x5) { var _again = true; _function: while (_again) { var object = _x3, property = _x4, receiver = _x5; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x3 = parent; _x4 = property; _x5 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

	var React = __webpack_require__(1);
	var Velocity = __webpack_require__(3);
	var _ = __webpack_require__(4);

	__webpack_require__(5);

	var VelocityTransitionGroupChild = (function (_React$Component) {
	    function VelocityTransitionGroupChild(props) {
	        _classCallCheck(this, VelocityTransitionGroupChild);

	        _get(Object.getPrototypeOf(VelocityTransitionGroupChild.prototype), 'constructor', this).call(this, props);
	        this.defaults = {
	            display: 'auto',
	            duration: this.props.duration || 350
	        };
	    }

	    _inherits(VelocityTransitionGroupChild, _React$Component);

	    _createClass(VelocityTransitionGroupChild, [{
	        key: '_animateParent',
	        value: function _animateParent(parent, height, done) {
	            var reverse = arguments[3] === undefined ? false : arguments[3];

	            var display = reverse ? null : 'block';

	            height = reverse ? 0 : [height, 0];

	            // make sure parent is hidden before rendering
	            if (!reverse) {
	                parent.style.display = 'none';
	                parent.style.overflow = 'hidden';
	            }

	            Velocity(parent, {
	                height: height
	            }, {
	                display: display,
	                duration: this.defaults.duration,
	                complete: done
	            });
	        }
	    }, {
	        key: '_animateChild',
	        value: function _animateChild(node, props, options, done) {
	            var _this = this;

	            var reverse = arguments[4] === undefined ? false : arguments[4];

	            var parent = this.props.transitionChild ? node : node.parentNode;
	            var child = this.props.transitionChild ? node.querySelector(this.props.transitionChild) : node;

	            // allow user to still be able to pass a complete callback
	            // need to call component callback no matter what
	            var _complete = options.complete ? function () {
	                options.complete();
	                done();
	            } : done;

	            // merge defaults and complete function into final options
	            options = _.extend(this.defaults, {
	                complete: _complete
	            }, options);

	            if (this.props.transitionHeight) {
	                (function () {

	                    var height = node.offsetHeight;

	                    // hide child until we show it
	                    child.style.opacity = 0;

	                    // pass everything to Velocity to handle animations
	                    if (reverse) {
	                        // flip complete functions since it's in reverse
	                        options = _.extend(options, {
	                            complete: function complete() {
	                                _this._animateParent(parent, height, _complete, true);
	                            }
	                        });
	                        Velocity(child, props, options);
	                    } else {
	                        _this._animateParent(parent, height, function () {
	                            Velocity(child, props, options);
	                        });
	                    }
	                })();
	            } else {
	                Velocity(node, props, options);
	            }
	        }
	    }, {
	        key: 'componentWillAppear',
	        value: function componentWillAppear(done) {

	            var props = this.props.appear !== false ? this.props.appear || this.props.enter : null;

	            if (props) {
	                // get the current child node
	                var node = React.findDOMNode(this);

	                // default to enter options if none provided for appear or false was not passed
	                var options = this.props.appear !== false ? this.props.appearOptions || {} : this.enterOptions;

	                this._animateChild(node, props, options, done);
	            }
	        }
	    }, {
	        key: 'componentWillEnter',
	        value: function componentWillEnter(done) {
	            var node = React.findDOMNode(this);
	            var options = this.props.enterOptions || {};

	            this._animateChild(node, this.props.enter, options, done);
	        }
	    }, {
	        key: 'componentWillLeave',
	        value: function componentWillLeave(done) {
	            // bail if no leave transition provided
	            if (typeof this.props.leave === 'undefined') return;

	            var node = React.findDOMNode(this);
	            var options = this.props.leaveOptions || {};

	            this._animateChild(node, this.props.leave, options, done, true);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return React.Children.only(this.props.children);
	        }
	    }]);

	    return VelocityTransitionGroupChild;
	})(React.Component);

	module.exports = VelocityTransitionGroupChild;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {
	    extend: function extend() {
	        for (var _len = arguments.length, objs = Array(_len), _key = 0; _key < _len; _key++) {
	            objs[_key] = arguments[_key];
	        }

	        var out = {},
	            objsLength = objs.length;

	        for (var i = 0; i < objsLength; i++) {
	            if (!objs[i]) continue;

	            for (var key in objs[i]) {
	                if (objs[i].hasOwnProperty(key)) {
	                    out[key] = objs[i][key];
	                }
	            }
	        }

	        return out;
	    }
	};

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ }
/******/ ])
});
;