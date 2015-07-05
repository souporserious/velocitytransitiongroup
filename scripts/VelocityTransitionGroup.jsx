'use strict';

import React from 'react';
import Velocity from 'velocity-animate';
import TransitionChildMapping from './TransitionChildMapping';
import _ from'./utilities';

require('velocity-animate/velocity.ui');

let VelocityTransitionGroupDefaults = {
    duration: 350
};

let VelocityTransitionGroup = React.createClass({
    
    propTypes: {
        component: React.PropTypes.any
    },

    getDefaultProps: function () {
        return {
            component: 'span',
            
            appear: 'transition.slideUpIn',
            appearOptions: {duration:1000, stagger: 100},
            
            enter: 'transition.slideUpIn',
            enterOptions: {duration: 3000},
            
            leave: 'transition.slideDownOut',
            leaveOptions: {duration: 6000},
            
            collection: true, // if you have a collection you want to pass
            duration: null,
            wrapper: false // if true a "dummy" div will be used to animate the height before transitioning an element in
        }
    },

    getInitialState: function () {
        return {
            children: this._getCurrentChildMapping()
        }
    },

    componentWillMount: function () {
        this.currentlyTransitioningKeys = {};
        this.keysToEnter = [];
        this.keysToLeave = [];
        this.defaults = VelocityTransitionGroupDefaults;
    },

    componentDidMount: function () {

        let initialChildMapping = this.state.children;
        let componentNodes = [];

        // loop through children and perform appear transition
        for(let key in initialChildMapping) {
            if(initialChildMapping[key]) {
                if(this.props.collection) {
                    componentNodes.push(this.refs[key].getDOMNode());
                    this.currentlyTransitioningKeys[key] = true;
                } else {
                    this.currentlyTransitioningKeys[key] = true;
                    this._animate(
                        this.refs[key].getDOMNode(),
                        this.props.appear,
                        this.props.appearOptions,
                        (function () {
                            delete this.currentlyTransitioningKeys[key];
                        }).bind(this)
                    );
                }
            }
        }

        // if this was a collection animate all of them now
        if(this.props.collection) {
            this._animate(
                componentNodes,
                this.props.appear,
                this.props.appearOptions,
                // remove all transitioned keys after completion
                () => {
                    for(let key in initialChildMapping) {
                        if(initialChildMapping[key]) {
                            delete this.currentlyTransitioningKeys[key];
                        }
                    }
                }
            );
        }
    },

    componentWillReceiveProps: function (nextProps) {

        let prevChildMapping = this.state.children;
        let nextChildMapping = this._getCurrentChildMapping(nextProps.children);

        this.setState({
            children: TransitionChildMapping.mergeChildMappings(
                prevChildMapping,
                nextChildMapping
            )
        });

        for(let key in nextChildMapping) {
            
            let hasPrev = prevChildMapping && prevChildMapping.hasOwnProperty(key);

            if(nextChildMapping[key] && !hasPrev &&
                !this.currentlyTransitioningKeys[key]) {
                this.keysToEnter.push(key);
            }
        }

        for(let key in prevChildMapping) {

            let hasNext = nextChildMapping && nextChildMapping.hasOwnProperty(key);

            if(prevChildMapping[key] && !hasNext &&
                !this.currentlyTransitioningKeys[key]) {
                this.keysToLeave.push(key);
            }
        }
    },

    componentDidUpdate: function () {
        
        let nodesToEnter = [];
        let keysToEnter = this.keysToEnter;
        this.keysToEnter = [];
        
        keysToEnter.forEach(key => {
            if(this.props.collection) {
                nodesToEnter.push(this.refs[key].getDOMNode());
                this.currentlyTransitioningKeys[key] = true;
            } else {
                this.currentlyTransitioningKeys[key] = true;
                this._animate(
                    this.refs[key].getDOMNode(),
                    this.props.enter,
                    this.props.enterOptions,
                    (function () {
                        delete this.currentlyTransitioningKeys[key];
                    }).bind(this)
                );
            }
        });

        // if this was a collection animate all of them now
        if(this.props.collection) {
            this._animate(
                nodesToEnter,
                this.props.enter,
                this.props.enterOptions,
                // remove all transitioned keys
                () => {
                    keysToEnter.forEach(key => {
                        delete this.currentlyTransitioningKeys[key];
                    });
                }
            );
        }

        let nodesToLeave = [];
        let keysToLeave = this.keysToLeave;
        this.keysToLeave = [];

        keysToLeave.forEach(key => {
            if(this.props.collection) {
                nodesToLeave.push(this.refs[key].getDOMNode());
                this.currentlyTransitioningKeys[key] = true;
            } else {
                
                this.currentlyTransitioningKeys[key] = true;

                this._animate(
                    this.refs[key].getDOMNode(),
                    this.props.leave,
                    this.props.leaveOptions,
                    (function () {
                        delete this.currentlyTransitioningKeys[key];

                        this.setState(state => {
                            let newChildren = this._assign({}, state.children);
                            delete newChildren[key];
                            return {children: newChildren};
                        });
                    }).bind(this)
                );
            }
        });

        // if this was a collection animate all of them now
        if(this.props.collection) {
            this._animate(
                nodesToLeave,
                this.props.leave,
                this.props.leaveOptions,
                // remove all transitioned keys
                () => {
                    keysToLeave.forEach(key => {
                        delete this.currentlyTransitioningKeys[key];
                    });

                    this.setState(state => {

                        let newChildren = this._assign({}, state.children);

                        keysToLeave.forEach(key => {
                            delete newChildren[key];
                        });

                        return {children: newChildren};
                    });
                }
            );
        }
    },

    // https://github.com/facebook/react/blob/38acadf6f493926383aec0362617b8507ddee0d8/src/shared/stubs/Object.assign.js
    _assign: function (target, sources) {
        
        if(target == null) {
            throw new TypeError('Object.assign target cannot be null or undefined');
        }

        let to = Object(target);
        let hasOwnProperty = Object.prototype.hasOwnProperty;

        for(let nextIndex = 1; nextIndex < arguments.length; nextIndex++) {
            
            let nextSource = arguments[nextIndex];
            
            if(nextSource == null) continue;

            let from = Object(nextSource);

            // We don't currently support accessors nor proxies. Therefore this
            // copy cannot throw. If we ever supported this then we must handle
            // exceptions and side-effects. We don't support symbols so they won't
            // be transferred.

            for(let key in from) {
                if(hasOwnProperty.call(from, key)) {
                    to[key] = from[key];
                }
            }
        }

        return to;
    },

    _getCurrentChildMapping: function (children = this.props.children) {
        return TransitionChildMapping.getChildMapping(children);
    },

    _animate: function (elements, properties, options, done) {

        // allow user to still be able to pass a complete callback
        let complete = (options.complete) ? function () {
            options.complete();
            done();
        } : done;

        // finally, merge defaults and callback into final options
        options = _.extend(this.defaults, {
            complete: complete
        }, options);

        Velocity(elements, properties, options);
    },

    _handleDoneEntering: function (key) {

        let component = this.refs[key];

        if(component.componentDidEnter) {
            component.componentDidEnter();
        }

        delete this.currentlyTransitioningKeys[key];

        let currentChildMapping = this._getCurrentChildMapping();

        if(!currentChildMapping || !currentChildMapping.hasOwnProperty(key)) {
            // this was removed before it had fully entered, remove it
            // could handle a reverse state here with Velocity
            this._performLeave(key);
        }
    },

    _performLeave: function (key) {

        let component = this.refs[key];

        this.currentlyTransitioningKeys[key] = true;

        if(component.componentWillLeave) {
            component.componentWillLeave(
                this._handleDoneLeaving.bind(this, key)
            );
        } else {
            // this is somewhat dangerous b/c it calls setState() again
            // effectively mutating the component before all work is done
            this._handleDoneLeaving(key);
        }
    },

    _handleDoneLeaving: function (key) {

        let component = this.refs[key];

        if(component.componentDidLeave) {
            component.componentDidLeave();
        }

        delete this.currentlyTransitioningKeys[key];

        let currentChildMapping = this._getCurrentChildMapping();

        if(currentChildMapping && currentChildMapping.hasOwnProperty(key)) {
            // This entered again before it fully left. Add it again.
            this._performEnter(key);
        } else {
            this.setState(state => {
                let newChildren = this._assign({}, state.children);
                delete newChildren[key];
                return {children: newChildren};
            });
        }
    },

    render: function () {
        
        let childrenToRender = [];

        for(let key in this.state.children) {

            let child = this.state.children[key];

            if(child) {
                childrenToRender.push(React.cloneElement(
                    child,
                    {ref: key, key: key}
                ));
            }
        }

        return React.createElement(
            this.props.component,
            this.props,
            childrenToRender
        );
    }
});

export default VelocityTransitionGroup;