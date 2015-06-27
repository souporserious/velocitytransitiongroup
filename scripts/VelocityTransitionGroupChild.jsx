'use strict';

let React = require('react/addons');
let Velocity = require('velocity-animate');

require('velocity-animate/velocity.ui');

class VelocityTransitionGroupChild extends React.Component {
    
    constructor(props) {
        super(props);
    }
    
    componentWillAppear(done) {
        if(this.props.transitionAppear) {
            let node = React.findDOMNode(this);
            Velocity(
                    node,
                    'transition.' + this.props.transitionEnter,
                    {
                        display: 'auto',
                        stagger: 1000,
                        duration: 2000,
                        complete: done
                    }
                );
        }
    }
 
    componentWillEnter(done) {
        
        let node = React.findDOMNode(this);
        let animation = () => {
            Velocity(
                node,
                'transition.' + this.props.transitionEnter,
                {
                    duration: 300,
                    complete: done
                }
            );     
        };
            
        if(this.props.transitionHeight) {
            
            let height = node.offsetHeight,
                parent = node.parentNode;
            
            // make sure parent is hidden before rendering
            parent.style.display = 'none';
            parent.style.overflow = 'hidden';
            
            Velocity(parent,
                {
                    height: [height, 0]
                }, {
                    display: 'block',
                    duration: 200,
                    complete: animation
                });
        }
        else {
            animation();
        }
    }

    componentWillLeave(done) {
        
        let node = React.findDOMNode(this);
        let animation = () => {
            Velocity(
                node,
                'transition.' +  this.props.transitionLeave,
                {
                    duration: 350,
                    complete: done
                }
            );
        };
        
        if(this.props.transitionHeight) {
            
            node.parentNode.style.display = 'block';
            node.parentNode.style.overflow = 'hidden';
            
            Velocity(node.parentNode,
                {
                height: 0
            }, {
                duration: 200,
                //delay: 350
            });
            animation();
        }
        else {
            animation();
        }
    }
 
    render() {
       return React.Children.only(this.props.children);
    }
}

module.exports = VelocityTransitionGroupChild;