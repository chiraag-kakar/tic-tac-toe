import React, { Component } from 'react';
import { connect } from 'react-redux';

import Loader from './Loader';
import Grid from './Grid/index';
import ActionsLog from './ActionsLog';

class App extends Component {

    constructor() {
        super();
    }

    render() {
        return (
            <div className='container'>
                <h1 className='title'>TIC TAC TOE</h1>
                <Loader>
                    <Grid/>
                </Loader>


                <h2 className="server-messages">{this.props.message}</h2>

                <ActionsLog/>
            </div>
        );
    }
}

export default connect(
    state => ({ message: state.game.message })
)(App);