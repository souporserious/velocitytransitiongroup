'use strict';

let React = require('react/addons');
let ReactTransitionGroup = React.addons.TransitionGroup;
let VelocityTransitionGroupChild = require('./VelocityTransitionGroupChild.jsx');

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

module.exports = VelocityTransitionGroup;