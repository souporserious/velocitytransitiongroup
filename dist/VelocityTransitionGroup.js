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

	__webpack_require__(5);

	var VelocityTransitionGroup = _react2['default'].createClass({
	    displayName: 'VelocityTransitionGroup',

	    propTypes: {
	        component: _react2['default'].PropTypes.any
	    },

	    getDefaultProps: function getDefaultProps() {
	        return {
	            component: 'span',
	            appear: 'transition.fadeIn',
	            appearOptions: {},
	            enter: 'transition.fadeIn',
	            enterOptions: {},
	            leave: 'transition.fadeOut',
	            leaveOptions: {},
	            duration: 350,
	            // if true a "dummy" div will be used to animate the height before transitioning an element in
	            wrapper: false
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
	        this.totalHeight = 0;
	        this.defaults = {
	            duration: this.props.duration
	        };
	    },

	    componentDidMount: function componentDidMount() {
	        this._appear();
	    },

	    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {

	        var prevChildMapping = this.state.children;
	        var nextChildMapping = this._getCurrentChildMapping(nextProps.children);

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

	        this.totalHeight = 0;

	        this._leave(keysToLeave, function () {

	            _this._getTotalHeight();

	            if (keysToEnter.length > 0) {
	                _this._hideElements(keysToEnter);
	            }

	            _this._enter(keysToEnter);
	        });
	    },

	    _getTotalHeight: function _getTotalHeight() {

	        var parent = _react2['default'].findDOMNode(this),
	            children = parent.children,
	            length = children.length;

	        function outerHeight(el) {

	            var height = el.offsetHeight,
	                style = getComputedStyle(el);

	            height += parseInt(style.marginTop) + parseInt(style.marginBottom);

	            return height;
	        }

	        if (length <= 0) {
	            this.totalHeight = 0;
	            return;
	        }

	        for (var i = 0; i < length; i++) {
	            this.totalHeight += outerHeight(children[i]);
	        }
	    },

	    _getCurrentChildMapping: function _getCurrentChildMapping() {
	        var children = arguments[0] === undefined ? this.props.children : arguments[0];

	        return _TransitionChildMapping2['default'].getChildMapping(children, this.props.wrapper);
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
	        options = _utilities2['default'].assign(this.defaults, {
	            complete: complete
	        }, options);

	        if (this.props.wrapper) {
	            (0, _velocityAnimate2['default'])(_react2['default'].findDOMNode(this), {
	                height: this.totalHeight
	            }, {
	                display: 'block',
	                duration: options.duration
	            });
	        }

	        (0, _velocityAnimate2['default'])(elements, properties, options);
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

	        this._animate(componentNodes, this.props.appear, this.props.appearOptions,
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

	        var nodesToLeave = [];

	        if (keysToLeave.length <= 0) {
	            done();
	        }

	        keysToLeave.forEach(function (key) {
	            nodesToLeave.push(_react2['default'].findDOMNode(_this5.refs[key]));
	            _this5.currentlyTransitioningKeys[key] = true;
	        });

	        this._animate(nodesToLeave, this.props.leave, this.props.leaveOptions,
	        // remove all transitioned keys
	        function () {
	            // delete keys now the we've finished transitioning
	            keysToLeave.forEach(function (key) {
	                delete _this5.currentlyTransitioningKeys[key];
	            });

	            // set the state of our new children and delete any
	            // keysToLeave stored
	            _this5.setState(function (state) {

	                var newChildren = _utilities2['default'].assign({}, state.children);

	                keysToLeave.forEach(function (key) {
	                    delete newChildren[key];
	                });

	                return { children: newChildren };
	            }, done);
	        });
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
	        var wrapper = arguments[1] === undefined ? false : arguments[1];

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

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/**********************
	   Velocity UI Pack
	**********************/

	/* VelocityJS.org UI Pack (5.0.4). (C) 2014 Julian Shapiro. MIT @license: en.wikipedia.org/wiki/MIT_License. Portions copyright Daniel Eden, Christian Pucci. */

	"use strict";

	;(function (factory) {
	    /* CommonJS module. */
	    if (true) {
	        module.exports = factory();
	        /* AMD module. */
	    } else if (typeof define === "function" && define.amd) {
	        define(["velocity"], factory);
	        /* Browser globals. */
	    } else {
	        factory();
	    }
	})(function () {
	    return (function (global, window, document, undefined) {

	        /*************
	            Checks
	        *************/

	        if (!global.Velocity || !global.Velocity.Utilities) {
	            window.console && console.log("Velocity UI Pack: Velocity must be loaded first. Aborting.");
	            return;
	        } else {
	            var Velocity = global.Velocity,
	                $ = Velocity.Utilities;
	        }

	        var velocityVersion = Velocity.version,
	            requiredVersion = { major: 1, minor: 1, patch: 0 };

	        function greaterSemver(primary, secondary) {
	            var versionInts = [];

	            if (!primary || !secondary) {
	                return false;
	            }

	            $.each([primary, secondary], function (i, versionObject) {
	                var versionIntsComponents = [];

	                $.each(versionObject, function (component, value) {
	                    while (value.toString().length < 5) {
	                        value = "0" + value;
	                    }
	                    versionIntsComponents.push(value);
	                });

	                versionInts.push(versionIntsComponents.join(""));
	            });

	            return parseFloat(versionInts[0]) > parseFloat(versionInts[1]);
	        }

	        if (greaterSemver(requiredVersion, velocityVersion)) {
	            var abortError = "Velocity UI Pack: You need to update Velocity (jquery.velocity.js) to a newer version. Visit http://github.com/julianshapiro/velocity.";
	            alert(abortError);
	            throw new Error(abortError);
	        }

	        /************************
	           Effect Registration
	        ************************/

	        /* Note: RegisterUI is a legacy name. */
	        Velocity.RegisterEffect = Velocity.RegisterUI = function (effectName, properties) {
	            /* Animate the expansion/contraction of the elements' parent's height for In/Out effects. */
	            function animateParentHeight(elements, direction, totalDuration, stagger) {
	                var totalHeightDelta = 0,
	                    parentNode;

	                /* Sum the total height (including padding and margin) of all targeted elements. */
	                $.each(elements.nodeType ? [elements] : elements, function (i, element) {
	                    if (stagger) {
	                        /* Increase the totalDuration by the successive delay amounts produced by the stagger option. */
	                        totalDuration += i * stagger;
	                    }

	                    parentNode = element.parentNode;

	                    $.each(["height", "paddingTop", "paddingBottom", "marginTop", "marginBottom"], function (i, property) {
	                        totalHeightDelta += parseFloat(Velocity.CSS.getPropertyValue(element, property));
	                    });
	                });

	                /* Animate the parent element's height adjustment (with a varying duration multiplier for aesthetic benefits). */
	                Velocity.animate(parentNode, { height: (direction === "In" ? "+" : "-") + "=" + totalHeightDelta }, { queue: false, easing: "ease-in-out", duration: totalDuration * (direction === "In" ? 0.6 : 1) });
	            }

	            /* Register a custom redirect for each effect. */
	            Velocity.Redirects[effectName] = function (element, redirectOptions, elementsIndex, elementsSize, elements, promiseData) {
	                var finalElement = elementsIndex === elementsSize - 1;

	                if (typeof properties.defaultDuration === "function") {
	                    properties.defaultDuration = properties.defaultDuration.call(elements, elements);
	                } else {
	                    properties.defaultDuration = parseFloat(properties.defaultDuration);
	                }

	                /* Iterate through each effect's call array. */
	                for (var callIndex = 0; callIndex < properties.calls.length; callIndex++) {
	                    var call = properties.calls[callIndex],
	                        propertyMap = call[0],
	                        redirectDuration = redirectOptions.duration || properties.defaultDuration || 1000,
	                        durationPercentage = call[1],
	                        callOptions = call[2] || {},
	                        opts = {};

	                    /* Assign the whitelisted per-call options. */
	                    opts.duration = redirectDuration * (durationPercentage || 1);
	                    opts.queue = redirectOptions.queue || "";
	                    opts.easing = callOptions.easing || "ease";
	                    opts.delay = parseFloat(callOptions.delay) || 0;
	                    opts._cacheValues = callOptions._cacheValues || true;

	                    /* Special processing for the first effect call. */
	                    if (callIndex === 0) {
	                        /* If a delay was passed into the redirect, combine it with the first call's delay. */
	                        opts.delay += parseFloat(redirectOptions.delay) || 0;

	                        if (elementsIndex === 0) {
	                            opts.begin = function () {
	                                /* Only trigger a begin callback on the first effect call with the first element in the set. */
	                                redirectOptions.begin && redirectOptions.begin.call(elements, elements);

	                                var direction = effectName.match(/(In|Out)$/);

	                                /* Make "in" transitioning elements invisible immediately so that there's no FOUC between now
	                                   and the first RAF tick. */
	                                if (direction && direction[0] === "In" && propertyMap.opacity !== undefined) {
	                                    $.each(elements.nodeType ? [elements] : elements, function (i, element) {
	                                        Velocity.CSS.setPropertyValue(element, "opacity", 0);
	                                    });
	                                }

	                                /* Only trigger animateParentHeight() if we're using an In/Out transition. */
	                                if (redirectOptions.animateParentHeight && direction) {
	                                    animateParentHeight(elements, direction[0], redirectDuration + opts.delay, redirectOptions.stagger);
	                                }
	                            };
	                        }

	                        /* If the user isn't overriding the display option, default to "auto" for "In"-suffixed transitions. */
	                        if (redirectOptions.display !== null) {
	                            if (redirectOptions.display !== undefined && redirectOptions.display !== "none") {
	                                opts.display = redirectOptions.display;
	                            } else if (/In$/.test(effectName)) {
	                                /* Inline elements cannot be subjected to transforms, so we switch them to inline-block. */
	                                var defaultDisplay = Velocity.CSS.Values.getDisplayType(element);
	                                opts.display = defaultDisplay === "inline" ? "inline-block" : defaultDisplay;
	                            }
	                        }

	                        if (redirectOptions.visibility && redirectOptions.visibility !== "hidden") {
	                            opts.visibility = redirectOptions.visibility;
	                        }
	                    }

	                    /* Special processing for the last effect call. */
	                    if (callIndex === properties.calls.length - 1) {
	                        (function () {
	                            /* Append promise resolving onto the user's redirect callback. */

	                            var injectFinalCallbacks = function injectFinalCallbacks() {
	                                if ((redirectOptions.display === undefined || redirectOptions.display === "none") && /Out$/.test(effectName)) {
	                                    $.each(elements.nodeType ? [elements] : elements, function (i, element) {
	                                        Velocity.CSS.setPropertyValue(element, "display", "none");
	                                    });
	                                }

	                                redirectOptions.complete && redirectOptions.complete.call(elements, elements);

	                                if (promiseData) {
	                                    promiseData.resolver(elements || element);
	                                }
	                            };

	                            opts.complete = function () {
	                                if (properties.reset) {
	                                    for (var resetProperty in properties.reset) {
	                                        var resetValue = properties.reset[resetProperty];

	                                        /* Format each non-array value in the reset property map to [ value, value ] so that changes apply
	                                           immediately and DOM querying is avoided (via forcefeeding). */
	                                        /* Note: Don't forcefeed hooks, otherwise their hook roots will be defaulted to their null values. */
	                                        if (Velocity.CSS.Hooks.registered[resetProperty] === undefined && (typeof resetValue === "string" || typeof resetValue === "number")) {
	                                            properties.reset[resetProperty] = [properties.reset[resetProperty], properties.reset[resetProperty]];
	                                        }
	                                    }

	                                    /* So that the reset values are applied instantly upon the next rAF tick, use a zero duration and parallel queueing. */
	                                    var resetOptions = { duration: 0, queue: false };

	                                    /* Since the reset option uses up the complete callback, we trigger the user's complete callback at the end of ours. */
	                                    if (finalElement) {
	                                        resetOptions.complete = injectFinalCallbacks;
	                                    }

	                                    Velocity.animate(element, properties.reset, resetOptions);
	                                    /* Only trigger the user's complete callback on the last effect call with the last element in the set. */
	                                } else if (finalElement) {
	                                    injectFinalCallbacks();
	                                }
	                            };

	                            if (redirectOptions.visibility === "hidden") {
	                                opts.visibility = redirectOptions.visibility;
	                            }
	                        })();
	                    }

	                    Velocity.animate(element, propertyMap, opts);
	                }
	            };

	            /* Return the Velocity object so that RegisterUI calls can be chained. */
	            return Velocity;
	        };

	        /*********************
	           Packaged Effects
	        *********************/

	        /* Externalize the packagedEffects data so that they can optionally be modified and re-registered. */
	        /* Support: <=IE8: Callouts will have no effect, and transitions will simply fade in/out. IE9/Android 2.3: Most effects are fully supported, the rest fade in/out. All other browsers: full support. */
	        Velocity.RegisterEffect.packagedEffects = {
	            /* Animate.css */
	            "callout.bounce": {
	                defaultDuration: 550,
	                calls: [[{ translateY: -30 }, 0.25], [{ translateY: 0 }, 0.125], [{ translateY: -15 }, 0.125], [{ translateY: 0 }, 0.25]]
	            },
	            /* Animate.css */
	            "callout.shake": {
	                defaultDuration: 800,
	                calls: [[{ translateX: -11 }, 0.125], [{ translateX: 11 }, 0.125], [{ translateX: -11 }, 0.125], [{ translateX: 11 }, 0.125], [{ translateX: -11 }, 0.125], [{ translateX: 11 }, 0.125], [{ translateX: -11 }, 0.125], [{ translateX: 0 }, 0.125]]
	            },
	            /* Animate.css */
	            "callout.flash": {
	                defaultDuration: 1100,
	                calls: [[{ opacity: [0, "easeInOutQuad", 1] }, 0.25], [{ opacity: [1, "easeInOutQuad"] }, 0.25], [{ opacity: [0, "easeInOutQuad"] }, 0.25], [{ opacity: [1, "easeInOutQuad"] }, 0.25]]
	            },
	            /* Animate.css */
	            "callout.pulse": {
	                defaultDuration: 825,
	                calls: [[{ scaleX: 1.1, scaleY: 1.1 }, 0.50, { easing: "easeInExpo" }], [{ scaleX: 1, scaleY: 1 }, 0.50]]
	            },
	            /* Animate.css */
	            "callout.swing": {
	                defaultDuration: 950,
	                calls: [[{ rotateZ: 15 }, 0.20], [{ rotateZ: -10 }, 0.20], [{ rotateZ: 5 }, 0.20], [{ rotateZ: -5 }, 0.20], [{ rotateZ: 0 }, 0.20]]
	            },
	            /* Animate.css */
	            "callout.tada": {
	                defaultDuration: 1000,
	                calls: [[{ scaleX: 0.9, scaleY: 0.9, rotateZ: -3 }, 0.10], [{ scaleX: 1.1, scaleY: 1.1, rotateZ: 3 }, 0.10], [{ scaleX: 1.1, scaleY: 1.1, rotateZ: -3 }, 0.10], ["reverse", 0.125], ["reverse", 0.125], ["reverse", 0.125], ["reverse", 0.125], ["reverse", 0.125], [{ scaleX: 1, scaleY: 1, rotateZ: 0 }, 0.20]]
	            },
	            "transition.fadeIn": {
	                defaultDuration: 500,
	                calls: [[{ opacity: [1, 0] }]]
	            },
	            "transition.fadeOut": {
	                defaultDuration: 500,
	                calls: [[{ opacity: [0, 1] }]]
	            },
	            /* Support: Loses rotation in IE9/Android 2.3 (fades only). */
	            "transition.flipXIn": {
	                defaultDuration: 700,
	                calls: [[{ opacity: [1, 0], transformPerspective: [800, 800], rotateY: [0, -55] }]],
	                reset: { transformPerspective: 0 }
	            },
	            /* Support: Loses rotation in IE9/Android 2.3 (fades only). */
	            "transition.flipXOut": {
	                defaultDuration: 700,
	                calls: [[{ opacity: [0, 1], transformPerspective: [800, 800], rotateY: 55 }]],
	                reset: { transformPerspective: 0, rotateY: 0 }
	            },
	            /* Support: Loses rotation in IE9/Android 2.3 (fades only). */
	            "transition.flipYIn": {
	                defaultDuration: 800,
	                calls: [[{ opacity: [1, 0], transformPerspective: [800, 800], rotateX: [0, -45] }]],
	                reset: { transformPerspective: 0 }
	            },
	            /* Support: Loses rotation in IE9/Android 2.3 (fades only). */
	            "transition.flipYOut": {
	                defaultDuration: 800,
	                calls: [[{ opacity: [0, 1], transformPerspective: [800, 800], rotateX: 25 }]],
	                reset: { transformPerspective: 0, rotateX: 0 }
	            },
	            /* Animate.css */
	            /* Support: Loses rotation in IE9/Android 2.3 (fades only). */
	            "transition.flipBounceXIn": {
	                defaultDuration: 900,
	                calls: [[{ opacity: [0.725, 0], transformPerspective: [400, 400], rotateY: [-10, 90] }, 0.50], [{ opacity: 0.80, rotateY: 10 }, 0.25], [{ opacity: 1, rotateY: 0 }, 0.25]],
	                reset: { transformPerspective: 0 }
	            },
	            /* Animate.css */
	            /* Support: Loses rotation in IE9/Android 2.3 (fades only). */
	            "transition.flipBounceXOut": {
	                defaultDuration: 800,
	                calls: [[{ opacity: [0.9, 1], transformPerspective: [400, 400], rotateY: -10 }, 0.50], [{ opacity: 0, rotateY: 90 }, 0.50]],
	                reset: { transformPerspective: 0, rotateY: 0 }
	            },
	            /* Animate.css */
	            /* Support: Loses rotation in IE9/Android 2.3 (fades only). */
	            "transition.flipBounceYIn": {
	                defaultDuration: 850,
	                calls: [[{ opacity: [0.725, 0], transformPerspective: [400, 400], rotateX: [-10, 90] }, 0.50], [{ opacity: 0.80, rotateX: 10 }, 0.25], [{ opacity: 1, rotateX: 0 }, 0.25]],
	                reset: { transformPerspective: 0 }
	            },
	            /* Animate.css */
	            /* Support: Loses rotation in IE9/Android 2.3 (fades only). */
	            "transition.flipBounceYOut": {
	                defaultDuration: 800,
	                calls: [[{ opacity: [0.9, 1], transformPerspective: [400, 400], rotateX: -15 }, 0.50], [{ opacity: 0, rotateX: 90 }, 0.50]],
	                reset: { transformPerspective: 0, rotateX: 0 }
	            },
	            /* Magic.css */
	            "transition.swoopIn": {
	                defaultDuration: 850,
	                calls: [[{ opacity: [1, 0], transformOriginX: ["100%", "50%"], transformOriginY: ["100%", "100%"], scaleX: [1, 0], scaleY: [1, 0], translateX: [0, -700], translateZ: 0 }]],
	                reset: { transformOriginX: "50%", transformOriginY: "50%" }
	            },
	            /* Magic.css */
	            "transition.swoopOut": {
	                defaultDuration: 850,
	                calls: [[{ opacity: [0, 1], transformOriginX: ["50%", "100%"], transformOriginY: ["100%", "100%"], scaleX: 0, scaleY: 0, translateX: -700, translateZ: 0 }]],
	                reset: { transformOriginX: "50%", transformOriginY: "50%", scaleX: 1, scaleY: 1, translateX: 0 }
	            },
	            /* Magic.css */
	            /* Support: Loses rotation in IE9/Android 2.3. (Fades and scales only.) */
	            "transition.whirlIn": {
	                defaultDuration: 850,
	                calls: [[{ opacity: [1, 0], transformOriginX: ["50%", "50%"], transformOriginY: ["50%", "50%"], scaleX: [1, 0], scaleY: [1, 0], rotateY: [0, 160] }, 1, { easing: "easeInOutSine" }]]
	            },
	            /* Magic.css */
	            /* Support: Loses rotation in IE9/Android 2.3. (Fades and scales only.) */
	            "transition.whirlOut": {
	                defaultDuration: 750,
	                calls: [[{ opacity: [0, "easeInOutQuint", 1], transformOriginX: ["50%", "50%"], transformOriginY: ["50%", "50%"], scaleX: 0, scaleY: 0, rotateY: 160 }, 1, { easing: "swing" }]],
	                reset: { scaleX: 1, scaleY: 1, rotateY: 0 }
	            },
	            "transition.shrinkIn": {
	                defaultDuration: 750,
	                calls: [[{ opacity: [1, 0], transformOriginX: ["50%", "50%"], transformOriginY: ["50%", "50%"], scaleX: [1, 1.5], scaleY: [1, 1.5], translateZ: 0 }]]
	            },
	            "transition.shrinkOut": {
	                defaultDuration: 600,
	                calls: [[{ opacity: [0, 1], transformOriginX: ["50%", "50%"], transformOriginY: ["50%", "50%"], scaleX: 1.3, scaleY: 1.3, translateZ: 0 }]],
	                reset: { scaleX: 1, scaleY: 1 }
	            },
	            "transition.expandIn": {
	                defaultDuration: 700,
	                calls: [[{ opacity: [1, 0], transformOriginX: ["50%", "50%"], transformOriginY: ["50%", "50%"], scaleX: [1, 0.625], scaleY: [1, 0.625], translateZ: 0 }]]
	            },
	            "transition.expandOut": {
	                defaultDuration: 700,
	                calls: [[{ opacity: [0, 1], transformOriginX: ["50%", "50%"], transformOriginY: ["50%", "50%"], scaleX: 0.5, scaleY: 0.5, translateZ: 0 }]],
	                reset: { scaleX: 1, scaleY: 1 }
	            },
	            /* Animate.css */
	            "transition.bounceIn": {
	                defaultDuration: 800,
	                calls: [[{ opacity: [1, 0], scaleX: [1.05, 0.3], scaleY: [1.05, 0.3] }, 0.40], [{ scaleX: 0.9, scaleY: 0.9, translateZ: 0 }, 0.20], [{ scaleX: 1, scaleY: 1 }, 0.50]]
	            },
	            /* Animate.css */
	            "transition.bounceOut": {
	                defaultDuration: 800,
	                calls: [[{ scaleX: 0.95, scaleY: 0.95 }, 0.35], [{ scaleX: 1.1, scaleY: 1.1, translateZ: 0 }, 0.35], [{ opacity: [0, 1], scaleX: 0.3, scaleY: 0.3 }, 0.30]],
	                reset: { scaleX: 1, scaleY: 1 }
	            },
	            /* Animate.css */
	            "transition.bounceUpIn": {
	                defaultDuration: 800,
	                calls: [[{ opacity: [1, 0], translateY: [-30, 1000] }, 0.60, { easing: "easeOutCirc" }], [{ translateY: 10 }, 0.20], [{ translateY: 0 }, 0.20]]
	            },
	            /* Animate.css */
	            "transition.bounceUpOut": {
	                defaultDuration: 1000,
	                calls: [[{ translateY: 20 }, 0.20], [{ opacity: [0, "easeInCirc", 1], translateY: -1000 }, 0.80]],
	                reset: { translateY: 0 }
	            },
	            /* Animate.css */
	            "transition.bounceDownIn": {
	                defaultDuration: 800,
	                calls: [[{ opacity: [1, 0], translateY: [30, -1000] }, 0.60, { easing: "easeOutCirc" }], [{ translateY: -10 }, 0.20], [{ translateY: 0 }, 0.20]]
	            },
	            /* Animate.css */
	            "transition.bounceDownOut": {
	                defaultDuration: 1000,
	                calls: [[{ translateY: -20 }, 0.20], [{ opacity: [0, "easeInCirc", 1], translateY: 1000 }, 0.80]],
	                reset: { translateY: 0 }
	            },
	            /* Animate.css */
	            "transition.bounceLeftIn": {
	                defaultDuration: 750,
	                calls: [[{ opacity: [1, 0], translateX: [30, -1250] }, 0.60, { easing: "easeOutCirc" }], [{ translateX: -10 }, 0.20], [{ translateX: 0 }, 0.20]]
	            },
	            /* Animate.css */
	            "transition.bounceLeftOut": {
	                defaultDuration: 750,
	                calls: [[{ translateX: 30 }, 0.20], [{ opacity: [0, "easeInCirc", 1], translateX: -1250 }, 0.80]],
	                reset: { translateX: 0 }
	            },
	            /* Animate.css */
	            "transition.bounceRightIn": {
	                defaultDuration: 750,
	                calls: [[{ opacity: [1, 0], translateX: [-30, 1250] }, 0.60, { easing: "easeOutCirc" }], [{ translateX: 10 }, 0.20], [{ translateX: 0 }, 0.20]]
	            },
	            /* Animate.css */
	            "transition.bounceRightOut": {
	                defaultDuration: 750,
	                calls: [[{ translateX: -30 }, 0.20], [{ opacity: [0, "easeInCirc", 1], translateX: 1250 }, 0.80]],
	                reset: { translateX: 0 }
	            },
	            "transition.slideUpIn": {
	                defaultDuration: 900,
	                calls: [[{ opacity: [1, 0], translateY: [0, 20], translateZ: 0 }]]
	            },
	            "transition.slideUpOut": {
	                defaultDuration: 900,
	                calls: [[{ opacity: [0, 1], translateY: -20, translateZ: 0 }]],
	                reset: { translateY: 0 }
	            },
	            "transition.slideDownIn": {
	                defaultDuration: 900,
	                calls: [[{ opacity: [1, 0], translateY: [0, -20], translateZ: 0 }]]
	            },
	            "transition.slideDownOut": {
	                defaultDuration: 900,
	                calls: [[{ opacity: [0, 1], translateY: 20, translateZ: 0 }]],
	                reset: { translateY: 0 }
	            },
	            "transition.slideLeftIn": {
	                defaultDuration: 1000,
	                calls: [[{ opacity: [1, 0], translateX: [0, -20], translateZ: 0 }]]
	            },
	            "transition.slideLeftOut": {
	                defaultDuration: 1050,
	                calls: [[{ opacity: [0, 1], translateX: -20, translateZ: 0 }]],
	                reset: { translateX: 0 }
	            },
	            "transition.slideRightIn": {
	                defaultDuration: 1000,
	                calls: [[{ opacity: [1, 0], translateX: [0, 20], translateZ: 0 }]]
	            },
	            "transition.slideRightOut": {
	                defaultDuration: 1050,
	                calls: [[{ opacity: [0, 1], translateX: 20, translateZ: 0 }]],
	                reset: { translateX: 0 }
	            },
	            "transition.slideUpBigIn": {
	                defaultDuration: 850,
	                calls: [[{ opacity: [1, 0], translateY: [0, 75], translateZ: 0 }]]
	            },
	            "transition.slideUpBigOut": {
	                defaultDuration: 800,
	                calls: [[{ opacity: [0, 1], translateY: -75, translateZ: 0 }]],
	                reset: { translateY: 0 }
	            },
	            "transition.slideDownBigIn": {
	                defaultDuration: 850,
	                calls: [[{ opacity: [1, 0], translateY: [0, -75], translateZ: 0 }]]
	            },
	            "transition.slideDownBigOut": {
	                defaultDuration: 800,
	                calls: [[{ opacity: [0, 1], translateY: 75, translateZ: 0 }]],
	                reset: { translateY: 0 }
	            },
	            "transition.slideLeftBigIn": {
	                defaultDuration: 800,
	                calls: [[{ opacity: [1, 0], translateX: [0, -75], translateZ: 0 }]]
	            },
	            "transition.slideLeftBigOut": {
	                defaultDuration: 750,
	                calls: [[{ opacity: [0, 1], translateX: -75, translateZ: 0 }]],
	                reset: { translateX: 0 }
	            },
	            "transition.slideRightBigIn": {
	                defaultDuration: 800,
	                calls: [[{ opacity: [1, 0], translateX: [0, 75], translateZ: 0 }]]
	            },
	            "transition.slideRightBigOut": {
	                defaultDuration: 750,
	                calls: [[{ opacity: [0, 1], translateX: 75, translateZ: 0 }]],
	                reset: { translateX: 0 }
	            },
	            /* Magic.css */
	            "transition.perspectiveUpIn": {
	                defaultDuration: 800,
	                calls: [[{ opacity: [1, 0], transformPerspective: [800, 800], transformOriginX: [0, 0], transformOriginY: ["100%", "100%"], rotateX: [0, -180] }]],
	                reset: { transformPerspective: 0, transformOriginX: "50%", transformOriginY: "50%" }
	            },
	            /* Magic.css */
	            /* Support: Loses rotation in IE9/Android 2.3 (fades only). */
	            "transition.perspectiveUpOut": {
	                defaultDuration: 850,
	                calls: [[{ opacity: [0, 1], transformPerspective: [800, 800], transformOriginX: [0, 0], transformOriginY: ["100%", "100%"], rotateX: -180 }]],
	                reset: { transformPerspective: 0, transformOriginX: "50%", transformOriginY: "50%", rotateX: 0 }
	            },
	            /* Magic.css */
	            /* Support: Loses rotation in IE9/Android 2.3 (fades only). */
	            "transition.perspectiveDownIn": {
	                defaultDuration: 800,
	                calls: [[{ opacity: [1, 0], transformPerspective: [800, 800], transformOriginX: [0, 0], transformOriginY: [0, 0], rotateX: [0, 180] }]],
	                reset: { transformPerspective: 0, transformOriginX: "50%", transformOriginY: "50%" }
	            },
	            /* Magic.css */
	            /* Support: Loses rotation in IE9/Android 2.3 (fades only). */
	            "transition.perspectiveDownOut": {
	                defaultDuration: 850,
	                calls: [[{ opacity: [0, 1], transformPerspective: [800, 800], transformOriginX: [0, 0], transformOriginY: [0, 0], rotateX: 180 }]],
	                reset: { transformPerspective: 0, transformOriginX: "50%", transformOriginY: "50%", rotateX: 0 }
	            },
	            /* Magic.css */
	            /* Support: Loses rotation in IE9/Android 2.3 (fades only). */
	            "transition.perspectiveLeftIn": {
	                defaultDuration: 950,
	                calls: [[{ opacity: [1, 0], transformPerspective: [2000, 2000], transformOriginX: [0, 0], transformOriginY: [0, 0], rotateY: [0, -180] }]],
	                reset: { transformPerspective: 0, transformOriginX: "50%", transformOriginY: "50%" }
	            },
	            /* Magic.css */
	            /* Support: Loses rotation in IE9/Android 2.3 (fades only). */
	            "transition.perspectiveLeftOut": {
	                defaultDuration: 950,
	                calls: [[{ opacity: [0, 1], transformPerspective: [2000, 2000], transformOriginX: [0, 0], transformOriginY: [0, 0], rotateY: -180 }]],
	                reset: { transformPerspective: 0, transformOriginX: "50%", transformOriginY: "50%", rotateY: 0 }
	            },
	            /* Magic.css */
	            /* Support: Loses rotation in IE9/Android 2.3 (fades only). */
	            "transition.perspectiveRightIn": {
	                defaultDuration: 950,
	                calls: [[{ opacity: [1, 0], transformPerspective: [2000, 2000], transformOriginX: ["100%", "100%"], transformOriginY: [0, 0], rotateY: [0, 180] }]],
	                reset: { transformPerspective: 0, transformOriginX: "50%", transformOriginY: "50%" }
	            },
	            /* Magic.css */
	            /* Support: Loses rotation in IE9/Android 2.3 (fades only). */
	            "transition.perspectiveRightOut": {
	                defaultDuration: 950,
	                calls: [[{ opacity: [0, 1], transformPerspective: [2000, 2000], transformOriginX: ["100%", "100%"], transformOriginY: [0, 0], rotateY: 180 }]],
	                reset: { transformPerspective: 0, transformOriginX: "50%", transformOriginY: "50%", rotateY: 0 }
	            }
	        };

	        /* Register the packaged effects. */
	        for (var effectName in Velocity.RegisterEffect.packagedEffects) {
	            Velocity.RegisterEffect(effectName, Velocity.RegisterEffect.packagedEffects[effectName]);
	        }

	        /*********************
	           Sequence Running
	        **********************/

	        /* Note: Sequence calls must use Velocity's single-object arguments syntax. */
	        Velocity.RunSequence = function (originalSequence) {
	            var sequence = $.extend(true, [], originalSequence);

	            if (sequence.length > 1) {
	                $.each(sequence.reverse(), function (i, currentCall) {
	                    var nextCall = sequence[i + 1];

	                    if (nextCall) {
	                        /* Parallel sequence calls (indicated via sequenceQueue:false) are triggered
	                           in the previous call's begin callback. Otherwise, chained calls are normally triggered
	                           in the previous call's complete callback. */
	                        var currentCallOptions = currentCall.o || currentCall.options,
	                            nextCallOptions = nextCall.o || nextCall.options;

	                        var timing = currentCallOptions && currentCallOptions.sequenceQueue === false ? "begin" : "complete",
	                            callbackOriginal = nextCallOptions && nextCallOptions[timing],
	                            options = {};

	                        options[timing] = function () {
	                            var nextCallElements = nextCall.e || nextCall.elements;
	                            var elements = nextCallElements.nodeType ? [nextCallElements] : nextCallElements;

	                            callbackOriginal && callbackOriginal.call(elements, elements);
	                            Velocity(currentCall);
	                        };

	                        if (nextCall.o) {
	                            nextCall.o = $.extend({}, nextCallOptions, options);
	                        } else {
	                            nextCall.options = $.extend({}, nextCallOptions, options);
	                        }
	                    }
	                });

	                sequence.reverse();
	            }

	            Velocity(sequence[0]);
	        };
	    })(window.jQuery || window.Zepto || window, window, document);
	});

/***/ }
/******/ ])
});
;