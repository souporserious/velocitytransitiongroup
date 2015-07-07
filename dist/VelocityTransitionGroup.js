(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("velocity-animate"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "velocity-animate"], factory);
	else if(typeof exports === 'object')
		exports["VelocityTransitionGroup"] = factory(require("react"), require("velocity-animate"));
	else
		root["VelocityTransitionGroup"] = factory(root["React"], root["Velocity"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__) {
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

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _utilities = __webpack_require__(1);

	var _utilities2 = _interopRequireDefault(_utilities);

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _velocityAnimate = __webpack_require__(3);

	var _velocityAnimate2 = _interopRequireDefault(_velocityAnimate);

	var _TransitionChildMapping = __webpack_require__(4);

	var _TransitionChildMapping2 = _interopRequireDefault(_TransitionChildMapping);

	var VelocityTransitionGroup = _react2['default'].createClass({
	    displayName: 'VelocityTransitionGroup',

	    propTypes: {
	        component: _react2['default'].PropTypes.any
	    },

	    getDefaultProps: function getDefaultProps() {
	        return {
	            component: 'span',
	            appear: null,
	            appearOptions: null,
	            enter: { opacity: [1, 0] },
	            enterOptions: {},
	            leave: { opacity: 0 },
	            leaveOptions: {},
	            defaults: {},
	            wrapper: false,
	            wrapperOptions: { display: 'block' }
	        };
	    },

	    getInitialState: function getInitialState() {
	        return {
	            children: this._getCurrentChildMapping()
	        };
	    },

	    componentWillMount: function componentWillMount() {
	        this.currentlyTransitioningKeys = {};
	        this.keysToEnter = [];
	        this.keysToLeave = [];
	        this.prevChildMapping = null;
	        this.nextChildMapping = null;
	        this.totalHeight = 0;
	        this.lastTotalHeight = 0;
	        this.defaults = _utilities2['default'].extend({
	            display: 'auto'
	        }, this.props.defaults);
	    },

	    componentDidMount: function componentDidMount() {
	        this.totalHeight = this._getTotalHeight(this.state.children);
	        this._appear();
	    },

	    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {

	        this.prevChildMapping = this.state.children;
	        this.nextChildMapping = this._getCurrentChildMapping(nextProps.children);

	        var prevChildMapping = this.prevChildMapping;
	        var nextChildMapping = this.nextChildMapping;

	        // set current and next children to current state
	        this.setState({
	            children: _TransitionChildMapping2['default'].mergeChildMappings(prevChildMapping, nextChildMapping)
	        });

	        for (var key in nextChildMapping) {

	            var hasPrev = prevChildMapping && prevChildMapping.hasOwnProperty(key);

	            if (nextChildMapping[key] && !hasPrev && !this.currentlyTransitioningKeys[key]) {
	                this.keysToEnter.push(key);
	            }
	        }

	        for (var key in prevChildMapping) {

	            var hasNext = nextChildMapping && nextChildMapping.hasOwnProperty(key);

	            if (prevChildMapping[key] && !hasNext && !this.currentlyTransitioningKeys[key]) {
	                this.keysToLeave.push(key);
	            }
	        }
	    },

	    componentDidUpdate: function componentDidUpdate() {
	        var _this = this;

	        var keysToEnter = this.keysToEnter;
	        this.keysToEnter = [];

	        var keysToLeave = this.keysToLeave;
	        this.keysToLeave = [];

	        // if same keys bail out
	        // could use old keys to check if same animation passed through twice
	        if (keysToEnter.length <= 0 && keysToLeave.length <= 0) {
	            return;
	        }

	        if (this.props.wrapper) {
	            // reset height before gathering it
	            this.totalHeight = 0;
	            this.totalHeight = this._getTotalHeight(this.nextChildMapping);
	        }

	        // hide elements so they don't appear until we need them to
	        this._hideElements(keysToEnter);

	        // just enter if keys to leave are empty
	        if (keysToLeave.length <= 0) {
	            this._animateWrapper();
	            this._enter(keysToEnter);
	        } else {
	            this._leave(keysToLeave, function () {
	                _this._animateWrapper();
	                _this._enter(keysToEnter);
	            });
	        }
	    },

	    _getTotalHeight: function _getTotalHeight(childMapping) {

	        function outerHeight(el) {

	            var height = el.offsetHeight,
	                style = getComputedStyle(el);

	            height += parseInt(style.marginTop) + parseInt(style.marginBottom);

	            return height;
	        }

	        var totalHeight = 0;

	        for (var key in childMapping) {
	            var node = _react2['default'].findDOMNode(this.refs[key]);
	            totalHeight += outerHeight(node);
	        }

	        return totalHeight;
	    },

	    _getCurrentChildMapping: function _getCurrentChildMapping() {
	        var children = arguments[0] === undefined ? this.props.children : arguments[0];

	        return _TransitionChildMapping2['default'].getChildMapping(children);
	    },

	    _hideElements: function _hideElements(keys) {
	        var _this2 = this;

	        keys.forEach(function (key) {
	            var node = _react2['default'].findDOMNode(_this2.refs[key]);
	            node.style.display = 'none';
	        });
	    },

	    _animate: function _animate(elements, properties, options, done) {

	        if (elements.length <= 0) return;

	        // allow user to still be able to pass a complete callback
	        var complete = options.complete ? function () {
	            options.complete();
	            done();
	        } : done;

	        // finally, merge defaults and callback into final options
	        options = _utilities2['default'].extend(this.defaults, {
	            complete: complete
	        }, options);

	        (0, _velocityAnimate2['default'])(elements, properties, options);
	    },

	    _animateWrapper: function _animateWrapper() {

	        if (!this.props.wrapper) return;

	        this._animate(_react2['default'].findDOMNode(this), {
	            height: [this.totalHeight, this.lastTotalHeight]
	        }, this.props.wrapperOptions, null);
	        this.lastTotalHeight = this.totalHeight;
	    },

	    _appear: function _appear() {
	        var _this3 = this;

	        var initialChildMapping = this.state.children;
	        var componentNodes = [];

	        if (!initialChildMapping) return;

	        // loop through children and store nodes
	        for (var key in initialChildMapping) {
	            if (initialChildMapping[key]) {
	                componentNodes.push(_react2['default'].findDOMNode(this.refs[key]));
	                this.currentlyTransitioningKeys[key] = true;
	            }
	        }

	        var properties = this.props.appear !== null ? this.props.appear : this.props.enter,
	            options = this.props.appearOptions !== null ? this.props.appearOptions : this.props.enterOptions;

	        this._animateWrapper();

	        this._animate(componentNodes, properties, options,
	        // remove all transitioned keys after completion
	        function () {
	            for (var key in initialChildMapping) {
	                if (initialChildMapping[key]) {
	                    delete _this3.currentlyTransitioningKeys[key];
	                }
	            }
	        });
	    },

	    _enter: function _enter(keysToEnter) {
	        var _this4 = this;

	        var nodesToEnter = [];

	        keysToEnter.forEach(function (key) {
	            nodesToEnter.push(_react2['default'].findDOMNode(_this4.refs[key]));
	            _this4.currentlyTransitioningKeys[key] = true;
	        });

	        this._animate(nodesToEnter, this.props.enter, this.props.enterOptions,
	        // remove all transitioned keys
	        function () {
	            keysToEnter.forEach(function (key) {
	                delete _this4.currentlyTransitioningKeys[key];
	            });
	        });
	    },

	    _leave: function _leave(keysToLeave, done) {
	        var _this5 = this;

	        var updateChildren = function updateChildren() {

	            // delete keys now the we've finished transitioning
	            keysToLeave.forEach(function (key) {
	                delete _this5.currentlyTransitioningKeys[key];
	            });

	            // delete any keysToLeave since they've transitioned out
	            // set the new children to current state
	            _this5.setState(function (state) {

	                var newChildren = _utilities2['default'].assign({}, state.children);

	                keysToLeave.forEach(function (key) {
	                    delete newChildren[key];
	                });

	                return { children: newChildren };
	            }, done);
	        };

	        var nodesToLeave = [];

	        if (keysToLeave.length <= 0) {
	            done();
	        }

	        keysToLeave.forEach(function (key) {
	            nodesToLeave.push(_react2['default'].findDOMNode(_this5.refs[key]));
	            _this5.currentlyTransitioningKeys[key] = true;
	        });

	        if (this.props.leave === false) {
	            updateChildren();
	            return;
	        }

	        this._animate(nodesToLeave, this.props.leave, this.props.leaveOptions, updateChildren);
	    },

	    render: function render() {

	        var childrenToRender = [];

	        for (var key in this.state.children) {

	            var child = this.state.children[key];

	            if (child) {
	                var newChild = _react2['default'].cloneElement(child, { ref: key, key: key });

	                childrenToRender.push(newChild);
	            }
	        }

	        return _react2['default'].createElement(this.props.component, this.props, childrenToRender);
	    }
	});

	exports['default'] = VelocityTransitionGroup;
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	exports['default'] = {
	    // https://github.com/facebook/react/blob/38acadf6f493926383aec0362617b8507ddee0d8/src/shared/stubs/Object.assign.js
	    assign: function assign(target, sources) {

	        if (target == null) {
	            throw new TypeError('Object.assign target cannot be null or undefined');
	        }

	        var to = Object(target);
	        var hasOwnProperty = Object.prototype.hasOwnProperty;

	        for (var nextIndex = 1; nextIndex < arguments.length; nextIndex++) {

	            var nextSource = arguments[nextIndex];

	            if (nextSource == null) continue;

	            var from = Object(nextSource);

	            // We don't currently support accessors nor proxies. Therefore this
	            // copy cannot throw. If we ever supported this then we must handle
	            // exceptions and side-effects. We don't support symbols so they won't
	            // be transferred.

	            for (var key in from) {
	                if (hasOwnProperty.call(from, key)) {
	                    to[key] = from[key];
	                }
	            }
	        }

	        return to;
	    },
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
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var TransitionChildMapping = {

	    getChildMapping: function getChildMapping(children) {

	        if (!children) return children;

	        // if only child make sure we return an array still
	        if (!Array.isArray(children)) {
	            children = [children];
	        }

	        var mappedChildren = {};

	        children.forEach(function (child) {
	            mappedChildren[child.key] = child;
	        });

	        return mappedChildren;
	    },

	    mergeChildMappings: function mergeChildMappings() {
	        var prev = arguments[0] === undefined ? {} : arguments[0];
	        var next = arguments[1] === undefined ? {} : arguments[1];

	        function getValueForKey(key) {
	            if (next.hasOwnProperty(key)) {
	                return next[key];
	            } else {
	                return prev[key];
	            }
	        }

	        // For each key of `next`, the list of keys to insert before that key in
	        // the combined list
	        var nextKeysPending = {};
	        var pendingKeys = [];

	        for (var prevKey in prev) {
	            if (next.hasOwnProperty(prevKey)) {
	                if (pendingKeys.length) {
	                    nextKeysPending[prevKey] = pendingKeys;
	                    pendingKeys = [];
	                }
	            } else {
	                pendingKeys.push(prevKey);
	            }
	        }

	        var childMapping = {};

	        for (var nextKey in next) {

	            if (nextKeysPending.hasOwnProperty(nextKey)) {

	                for (var i = 0; i < nextKeysPending[nextKey].length; i++) {

	                    var pendingNextKey = nextKeysPending[nextKey][i];

	                    childMapping[nextKeysPending[nextKey][i]] = getValueForKey(pendingNextKey);
	                }
	            }
	            childMapping[nextKey] = getValueForKey(nextKey);
	        }

	        // Finally, add the keys which didn't appear before any key in `next`
	        for (var i = 0; i < pendingKeys.length; i++) {
	            childMapping[pendingKeys[i]] = getValueForKey(pendingKeys[i]);
	        }

	        return childMapping;
	    }
	};

	module.exports = TransitionChildMapping;

/***/ }
/******/ ])
});
;