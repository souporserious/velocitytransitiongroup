'use strict';

import React from 'react/addons';
import VelocityTransitionGroup from './VelocityTransitionGroup';
import '../example/main.scss';

class ModalDemo extends React.Component {

    constructor() {
        super();
    }

    toggleWells() {
        let newWells = this.state.wells;
        newWells.push(new Date());
        this.setState({wells: newWells});
    }

    render() {

        let wells = this.props.wells.map(well => {
            return <div key={well} className="modal__well">{well}</div>;
        });

        return(
            <main className="modal">
                <VelocityTransitionGroup
                    component="div"
                    className="modal__body"
                    appear="transition.fadeIn"
                    appearOptions={{
                        stagger: 350
                    }}
                    enter="transition.fadeIn"
                    enterOptions={{
                        stagger: 350
                    }}
                    leave="transition.fadeOut"
                    leaveOptions={{
                        stagger: 350
                    }}
                    duration={350}
                    wrapper={true}
                >
                    {wells}
                </VelocityTransitionGroup>
            </main>
        );
    }
}

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = { items: ['apples', 'oranges', 'bananas', 'pears', 'kiwis'], wells: [] };
    }

    addItem() {
        var newItems = this.state.items.concat([prompt('Enter some text')]);
        this.setState({ items: newItems });
    }

    removeItem(index) {
        var newItems = this.state.items;
        newItems.splice(index, 1);
        this.setState({ items: newItems });
    }

    reverse() {
        this.setState({items: this.state.items.reverse()});
    }

    handleWells(wells) {
        this.setState({wells: wells});
    }

    render() {

        let items = this.state.items.map((item, index) => {
            return(
                <li key={item} onClick={this.removeItem.bind(this, index)}>
                    {item}
                </li>
            );
        });

        return(
            <div className="app">
                <button onClick={this.handleWells.bind(this, ['main', 'profile', 'contact'])}>1st Set</button>
                <button onClick={this.handleWells.bind(this, ['help', 'contact'])}>2nd Set</button>
                <button onClick={this.handleWells.bind(this, ['main', 'about', 'blog', 'help'])}>3rd Set</button>
                <ModalDemo wells={this.state.wells} />

                <div className="buttons">
                    <button onClick={this.addItem.bind(this)}>Add Item</button>
                    <button onClick={this.reverse.bind(this)}>Reverse</button>
                </div>
                <VelocityTransitionGroup
                    component="ul"
                    appearOptions={{
                        stagger: 350
                    }}
                >
                    {items}
                </VelocityTransitionGroup>
            </div>
        );
    }
}

React.render(<App />, document.body);