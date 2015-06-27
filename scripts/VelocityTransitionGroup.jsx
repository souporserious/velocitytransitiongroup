'use strict';

let React =  require('react/addons');
let ReactTransitionGroup = React.addons.TransitionGroup;
let VelocityTransitionGroupChild = require('./VelocityTransitionGroupChild.jsx');
 
class VelocityTransitionGroup extends React.Component {
    constructor(props) {
        super(props);
        this._wrapChild = this._wrapChild.bind(this);
    }

    _wrapChild(child) {
        // see how we could do something like a click and wiggle a button
        // maybe allow to do something like transitionEnter="fadeIn", calloutEnter="tada"
        return (
            <VelocityTransitionGroupChild
                transitionEnter={this.props.transitionEnter}
                transitionLeave={this.props.transitionLeave}
                transitionAppear={this.props.transitionAppear}
                transitionHeight={this.props.transitionHeight}
            >
                {child}
            </VelocityTransitionGroupChild>
        );
    }

    render() {
        return (
            <ReactTransitionGroup {...this.props} childFactory={this._wrapChild} />
        );
    }
}

VelocityTransitionGroup.propTypes = {
    transitionEnter: React.PropTypes.string.isRequired,
    // if not set, no transition out should happen on leave
    transitionLeave: React.PropTypes.string,
    // either pass true to use effectIn, or another string to for a seperate transition on load
    transitionAppear: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.bool
    ]),
    // can pass parent node to try and animate instead of node's immediate parent
    transitionHeight: React.PropTypes.bool
};

VelocityTransitionGroup.defaultProps = {
    transitionAppear: true,
    animateHeight: false
};

module.exports = VelocityTransitionGroup;