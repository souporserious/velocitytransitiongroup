'use strict';

let React = require('react/addons');
let Velocity = require('velocity-animate');
let _ = require('./utilities');

require('velocity-animate/velocity.ui');

class VelocityTransitionGroupChild extends React.Component {
    
    constructor(props) {
        super(props);
        this.defaults = {
            display: 'auto',
            duration: this.props.duration || 350
        };
    }

    _animateParent(parent, height, done, reverse = false) {

        let display = reverse ? null : 'block';

        height = reverse ? 0 : [height, 0];
        
        // make sure parent is hidden before rendering
        if(!reverse) {
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

    _animateChild(node, props, options, done, reverse = false) {
        
        let parent = this.props.transitionChild ? node : node.parentNode;
        let child = this.props.transitionChild ? node.querySelector(this.props.transitionChild) : node;
        
        // allow user to still be able to pass a complete callback
        // need to call component callback no matter what
        let complete = (options.complete) ? function () {
                options.complete();
                done();
            } : done;

        // merge defaults and complete function into final options
        options = _.extend(this.defaults, {
            complete: complete
        }, options);

        if(this.props.transitionHeight) {
            
            let height = node.offsetHeight;
            
            // hide child until we show it
            child.style.opacity = 0;

            // pass everything to Velocity to handle animations
            if(reverse) {
                // flip complete functions since it's in reverse
                options = _.extend(options, {
                    complete: () => {
                        this._animateParent(parent, height, complete, true);
                    }
                });
                Velocity(child, props, options);
            }
            else {
                this._animateParent(parent, height, function () {
                    Velocity(child, props, options);
                });
            }
        }
        else {
            Velocity(node, props, options);
        }
    }

    componentWillAppear(done) {

        let props = (this.props.appear !== false) ?
                     this.props.appear || this.props.enter : null;

        if(props) {
            // get the current child node
            let node = React.findDOMNode(this);

            // default to enter options if none provided for appear or false was not passed
            let options = (this.props.appear !== false) ?
                           this.props.appearOptions || {} : this.enterOptions;

            this._animateChild(node, props, options, done);
        }
    }

    componentWillEnter(done) {
        let node = React.findDOMNode(this);
        let options = this.props.enterOptions || {};

        this._animateChild(node, this.props.enter, options, done);
    }

    componentWillLeave(done) {
        // bail if no leave transition provided
        if(typeof this.props.leave === 'undefined') return;

        let node = React.findDOMNode(this);
        let options = this.props.leaveOptions || {};
        
        this._animateChild(node, this.props.leave, options, done, true);
    }
 
    render() {
        return React.Children.only(this.props.children);
    }
}

module.exports = VelocityTransitionGroupChild;