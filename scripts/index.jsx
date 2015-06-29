'use strict';

var React = require('react/addons');
var VelocityTransitionGroup = require('./VelocityTransitionGroup');

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { items: ['apples', 'oranges', 'bananas', 'pears', 'kiwis'] };
    }

    addItem() {
        var items = this.state.items.concat([prompt('Enter some text')]);
        this.setState({ items: items });
    }

    removeItem(index) {
        var items = this.state.items;
        items.splice(index, 1);
        this.setState({ items: items });
    }

    render() {

        let items = this.state.items.map((item, index) => {
            var styles = {
                background: 'red'
            };
            return(
                <li style={styles} key={index + '-' + item} onClick={this.removeItem.bind(this, index)}>
                    <div>{item}</div>
                </li>
            );
        });

        return(
            <div>
                {/*<button>Wiggle</button>*/}
                <button onClick={this.addItem.bind(this)}>Add Item</button>
                <VelocityTransitionGroup
                    component="ul"
                    enter="transition.slideUpIn"
                    leave="transition.slideDownOut"
                    transitionHeight={true}
                    transitionChild="*"
                    duration={350}
                >
                    {items}
                </VelocityTransitionGroup>
            </div>
        );
    }
}

/*
<VelocityTransitionGroup
    component="ul"
    
    // transition upon entering DOM
    enter="fadeIn"
    
    // if not set, no transition out should happen on leave
    leave="transition.fadeOut"
    
    // either pass true or another string for a seperate transition on load
    appear="transition.fadeIn"
    
    // pass true to use immediate parent or specify element to look for to
    // transition height and make room to animate element in
    transitionHeight={false}

    // set a default duration for all transitions
    duration={300}

    // optionally pass in any options to velocity
    // will override transitionEnter, transitionLeave, etc..
    enterOptions={{
        delay: 100,
        etc...
    }}
    leaveOptions=""
    appearOptions=""
>
    {items}
</VelocityTransitionGroup>
*/

React.render(<App />, document.body);