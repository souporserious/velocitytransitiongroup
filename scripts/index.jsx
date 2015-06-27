'use strict';

var React = require('react/addons');
var VelocityTransitionGroup = require('./VelocityTransitionGroup');

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { items: ['apples', 'oranges', 'bananas'] };
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
            return(
                <li key={item + index} onClick={this.removeItem.bind(this, index)}>
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
                    transitionEnter="fadeIn"
                    transitionLeave="fadeOut"
                    transitionHeight={true}
                >
                    {items}
                </VelocityTransitionGroup>
            </div>
        );
    }
}

React.render(<App />, document.body);