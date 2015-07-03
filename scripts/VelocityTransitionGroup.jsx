'use strict';

import React from 'react/addons';
import TransitionChildMapping from './TransitionChildMapping';
import VelocityTransitionGroupChild from './VelocityTransitionGroupChild';

// TODOS:
//
// maybe have a prop to check whether groups will be rendering,
// this way we can let Velocity handle more performant animations
// as well as allow them to have things like a stagger animation
// 
// we also need to hook up transitionHeight better

let ReactTransitionGroup = React.createClass({
    
    propTypes: {
        component: React.PropTypes.any,
        childFactory: React.PropTypes.func
    },

    getDefaultProps: function () {
        return {
            component: 'span',
            childFactory: a => a
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
    },

    componentDidMount: function () {

        let initialChildMapping = this.state.children;

        for(let key in initialChildMapping) {
            if(initialChildMapping[key]) {
                this._performAppear(key);
            }
        }
    },

    componentWillReceiveProps: function (nextProps) {

        let nextChildMapping = this._getCurrentChildMapping(nextProps.children);
        let prevChildMapping = this.state.children;

        console.log(prevChildMapping);
        console.log(nextChildMapping);

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
        keysToEnter.forEach(this._performEnter);

        let keysToLeave = this.keysToLeave;
        this.keysToLeave = [];
        keysToLeave.forEach(this._performLeave);
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

    _setCurrentTransitioningKey: function (key) {
        this.currentlyTransitioningKeys[key] = true;
    },

    _performAppear: function (key) {

        let component = this.refs[key];

        this.currentlyTransitioningKeys[key] = true;

        if(component.componentWillAppear) {
            component.componentWillAppear(
                this._handleDoneAppearing.bind(this, key)
            );
        } else {
            this._handleDoneAppearing(key);
        }
    },

    _handleDoneAppearing: function (key) {

        let component = this.refs[key];

        if(component.componentDidAppear) {
            component.componentDidAppear();
        }

        delete this.currentlyTransitioningKeys[key];

        let currentChildMapping = this._getCurrentChildMapping();

        if(!currentChildMapping || !currentChildMapping.hasOwnProperty(key)) {
            // this was removed before it had fully appeared, remove it
            // could handle a reverse state here with Velocity
            this._performLeave(key);
        }
    },

    // very very similar to appear, see if we can refactor
    _performEnter: function (key) {

        let component = this.refs[key];

        this.currentlyTransitioningKeys[key] = true;

        if(component.componentWillEnter) {
            component.componentWillEnter(
                this._handleDoneEntering.bind(this, key)
            );
        } else {
            this._handleDoneEntering(key);
        }
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
                    this.props.childFactory(child),
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

class VelocityTransitionGroup extends React.Component {
    constructor(props) {
        super(props);
    }

    _wrapChild(child) {
        // see how we could do something like a click and wiggle a button
        // maybe allow to do something like transitionEnter="fadeIn", calloutEnter="tada"
        return (
            <VelocityTransitionGroupChild
                enter={this.props.enter}
                enterOptions={this.props.enterOptions}
                leave={this.props.leave}
                leaveOptions={this.props.leaveOptions}
                appear={this.props.appear}
                appearOptions={this.props.appearOptions}
                duration={this.props.duration}
                transitionHeight={this.props.transitionHeight}
                transitionChild={this.props.transitionChild}
            >
                {child}
            </VelocityTransitionGroupChild>
        );
    }

    render() {
        return (
            <ReactTransitionGroup {...this.props} childFactory={this._wrapChild.bind(this)} />
        );
    }
}

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

export default VelocityTransitionGroup;