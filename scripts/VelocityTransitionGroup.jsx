'use strict';

import _ from './utilities';
import React from 'react';
import Velocity from 'velocity-animate';
import TransitionChildMapping from './TransitionChildMapping';

let VelocityTransitionGroup = React.createClass({
    
    propTypes: {
        component: React.PropTypes.any
    },

    getDefaultProps: function () {
        return {
            component: 'span',
            appear: null,
            appearOptions: null,
            enter: {opacity: [1, 0]},
            enterOptions: {},
            leave: {opacity: 0},
            leaveOptions: {},
            defaults: {},
            wrapper: false
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
        this.prevChildMapping = null;
        this.nextChildMapping = null;
        this.totalHeight = 0;
        this.defaults = _.assign({
            display: 'auto'
        }, this.props.defaults);
    },

    componentDidMount: function () {
        this._appear();
    },

    componentWillReceiveProps: function (nextProps) {

        this.prevChildMapping = this.state.children;
        this.nextChildMapping = this._getCurrentChildMapping(nextProps.children);

        let prevChildMapping = this.prevChildMapping;
        let nextChildMapping = this.nextChildMapping;

        // set current and next children to current state
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

        let keysToEnter = this.keysToEnter;
        this.keysToEnter = [];

        let keysToLeave = this.keysToLeave;
        this.keysToLeave = [];

        // if same keys bail out
        if(keysToEnter.length <= 0 && keysToLeave.length <= 0) {
            return;
        }

        if(this.props.wrapper) {
            // reset height before gathering it
            this.totalHeight = 0;
            this.totalHeight = this._getTotalHeight(this.nextChildMapping);

            // hide elements so they don't appear when transitioning wrapper
            this._hideElements(keysToEnter);
        }

        // just enter if keys to leave are empty
        if(keysToLeave.length <= 0) {
            this._enter(keysToEnter);
        } else {
            this._leave(keysToLeave, () => {
                this._enter(keysToEnter);
            });
        }
    },

    _getTotalHeight: function (childMapping) {

        function outerHeight(el) {

            let height = el.offsetHeight,
                style = getComputedStyle(el);

            height += parseInt(style.marginTop) + parseInt(style.marginBottom);
            
            return height;
        }

        let totalHeight = 0;

        for(let key in childMapping) {
            let node = React.findDOMNode(this.refs[key]);
            totalHeight += outerHeight(node);
        }

        return totalHeight;
    },

    _getCurrentChildMapping: function (children = this.props.children) {
        return TransitionChildMapping.getChildMapping(children);
    },

    _hideElements: function (keys) {
        keys.forEach(key => {
            let node = React.findDOMNode(this.refs[key]);
            node.style.display = 'none';
        });
    },

    _animate: function (elements, properties, options, done) {

        if(elements.length <= 0) return;

        // allow user to still be able to pass a complete callback
        let complete = (options.complete) ? () => {
            options.complete();
            done();
        } : done;

        // finally, merge defaults and callback into final options
        options = _.assign(this.defaults, {
            complete: complete
        }, options);

        if(this.props.wrapper) {
            Velocity(
                React.findDOMNode(this),
                {
                    height: this.totalHeight
                }, {
                    display: 'block',
                    duration: options.duration
                }
            );
        }

        Velocity(elements, properties, options);
    },

    _appear: function () {

        let initialChildMapping = this.state.children;
        let componentNodes = [];

        if(!initialChildMapping) return;

        // loop through children and store nodes
        for(let key in initialChildMapping) {
            if(initialChildMapping[key]) {
                componentNodes.push(React.findDOMNode(this.refs[key]));
                this.currentlyTransitioningKeys[key] = true;
            }
        }

        let properties = this.props.appear !== null ? this.props.appear : this.props.enter,
            options = this.props.appearOptions !== null ? this.props.appearOptions : this.props.enterOptions;

        this._animate(
            componentNodes,
            properties,
            options,
            // remove all transitioned keys after completion
            () => {
                for(let key in initialChildMapping) {
                    if(initialChildMapping[key]) {
                        delete this.currentlyTransitioningKeys[key];
                    }
                }
            }
        );
    },

    _enter: function (keysToEnter) {

        let nodesToEnter = [];

        keysToEnter.forEach(key => {
            nodesToEnter.push(React.findDOMNode(this.refs[key]));
            this.currentlyTransitioningKeys[key] = true;
        });

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
    },

    _leave: function (keysToLeave, done) {

        let updateChildren = () => {

            // delete keys now the we've finished transitioning
            keysToLeave.forEach(key => {
                delete this.currentlyTransitioningKeys[key];
            });

            // delete any keysToLeave since they've transitioned out
            // set the new children to current state
            this.setState(state => {

                let newChildren = _.assign({}, state.children);

                keysToLeave.forEach(key => {
                    delete newChildren[key];
                });

                return {children: newChildren};
            }, done);
        }

        let nodesToLeave = [];

        if(keysToLeave.length <= 0) {
            done();
        }

        keysToLeave.forEach(key => {
            nodesToLeave.push(React.findDOMNode(this.refs[key]));
            this.currentlyTransitioningKeys[key] = true;
        });

        if(this.props.leave === false) {
            updateChildren();
            return;
        }

        this._animate(
            nodesToLeave,
            this.props.leave,
            this.props.leaveOptions,
            updateChildren
        );
    },

    render: function () {
        
        let childrenToRender = [];

        for(let key in this.state.children) {

            let child = this.state.children[key];

            if(child) {
                let newChild = React.cloneElement(
                    child,
                    {ref: key, key: key}
                );

                childrenToRender.push(newChild);
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