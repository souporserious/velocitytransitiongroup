'use strict';

import React from 'react/addons';
import VelocityTransitionGroup from './VelocityTransitionGroup';
import '../example/main.scss';

require('velocity-animate/velocity.ui');

class InsertDemo extends React.Component {
    constructor() {
        super();
        this.state = {clicked: false};
    }

    toggle() {
        this.setState({clicked: !this.state.clicked});
    }

    render() {
        return(
            <div className="box" onClick={this.toggle.bind(this)}>
                <div className="box__header"></div>
                <VelocityTransitionGroup
                    enter="transition.fadeIn"
                    enterOptions={{delay: 100}}
                    leave="transition.fadeOut"
                    duration={450}
                    wrapper={true}
                >
                    {this.state.clicked && <div key="inner" className="box__inner"></div>}
                </VelocityTransitionGroup>
            </div>
        );
    }
}

class ModalDemo extends React.Component {

    constructor(props) {
        super(props);
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

class ToDo extends React.Component {

    constructor(props) {
        super(props);
        this.state = { items: ['apples', 'oranges', 'bananas', 'pears', 'kiwis'] };
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

    render() {

        let items = this.state.items.map((item, index) => {
            return(
                <li key={item} onClick={this.removeItem.bind(this, index)}>
                    {item}
                </li>
            );
        });

        return(
            <div className="todo-app">
                <div className="buttons">
                    <button onClick={this.addItem.bind(this)}>Add Item</button>
                    <button onClick={this.reverse.bind(this)}>Reverse</button>
                </div>
                <VelocityTransitionGroup
                    component="ul"
                    appearOptions={{
                        stagger: 35
                    }}
                >
                    {items}
                </VelocityTransitionGroup>
            </div>
        );
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {wells: []};
    }

    handleWells(wells) {
        this.setState({wells: wells});
    }

    render() {
        return(
            <div className="app">
                <InsertDemo />

                <button onClick={this.handleWells.bind(this, ['main', 'profile', 'contact'])}>1st Set</button>
                <button onClick={this.handleWells.bind(this, ['help', 'contact'])}>2nd Set</button>
                <button onClick={this.handleWells.bind(this, ['main', 'about', 'blog', 'help'])}>3rd Set</button>
                <ModalDemo wells={this.state.wells} />

                <ToDo />
            </div>
        );
    }
}

React.render(<App />, document.body);