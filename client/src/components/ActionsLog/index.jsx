import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getLog } from '../../actions/game.actions';

import './style.scss';

class ActionsLog extends Component {

    constructor() {
        super();
    }

    componentDidMount() {
        this.props.getLog();
    }

    render() {
        return (
            <div className='vp-actions-log'>
                <div className="vp-inner">
                    {this.props.log && this.props.log.map((l, i) => <div className="vp-log-item" key={`msg-${i}`}>{l.message}</div>)}
                </div>
            </div>
        );
    }
}

export default connect(
    state => ({
        log: state.game.log
    }),
    { getLog }
)(ActionsLog);
