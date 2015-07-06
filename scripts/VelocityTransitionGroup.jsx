'use strict';

import _ from 'lodash';
import React from 'react';
import Velocity from 'velocity-animate';
import TransitionChildMapping from './TransitionChildMapping';

require('velocity-animate/velocity.ui');

let VelocityTransitionGroup = React.createClass({
    
    propTypes: {
        component: React.PropTypes.any
    },

    getDefaultProps: function () {
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
        this.totalHeight = 0;
        this.defaults = {
            duration: this.props.duration
        };
    },

    componentDidMount: function () {
        this._appear();
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

        let keysToEnter = this.keysToEnter;
        this.keysToEnter = [];

        if(keysToEnter.length > 0) {
            this._hideElements(keysToEnter);
        }

        let keysToLeave = this.keysToLeave;
        this.keysToLeave = [];

        this._leave(keysToLeave, () => {
            this._enter(keysToEnter);
        });
    },

    _getCurrentChildMapping: function (children = this.props.children) {
        return TransitionChildMapping.getChildMapping(children, this.props.wrapper);
    },

    _hideElements: function (keys) {
        keys.forEach(key => {
            
            let node = this.refs[key].getDOMNode();

            if(this.props.wrapper) {
                this.totalHeight += node.offsetHeight;
                node = node.firstChild;
            }
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

            elements = elements[0];

            Velocity(
                elements,
                {
                    height: this.totalHeight
                }, {
                    duration: options.duration
                }
            );

            elements = elements.firstChild;
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
                componentNodes.push(this.refs[key].getDOMNode());
                this.currentlyTransitioningKeys[key] = true;
            }
        }

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
                this.totalHeight = 0;
            }
        );
    },

    _enter: function (keysToEnter) {

        let nodesToEnter = [];

        keysToEnter.forEach(key => {
            nodesToEnter.push(this.refs[key].getDOMNode());
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
                this.totalHeight = 0;
            }
        );
    },

    _leave: function (keysToLeave, done) {

        let nodesToLeave = [];

        if(keysToLeave.length <= 0) {
            done();
        }

        keysToLeave.forEach(key => {
            nodesToLeave.push(this.refs[key].getDOMNode());
            this.currentlyTransitioningKeys[key] = true;
        });

        this._animate(
            nodesToLeave,
            this.props.leave,
            this.props.leaveOptions,
            // remove all transitioned keys
            () => {
                // delete keys now the we've finished transitioning
                keysToLeave.forEach(key => {
                    delete this.currentlyTransitioningKeys[key];
                });

                // set the state of our new children and delete any
                // keysToLeave stored
                this.setState(state => {

                    let newChildren = _.assign({}, state.children);

                    keysToLeave.forEach(key => {
                        delete newChildren[key];
                    });

                    return {children: newChildren};
                }, done);
            }
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