import React, { Component } from 'react';
import { connect } from 'react-redux';

import './style.scss';

class Loader extends Component {

    constructor() {
        super();
    }

    render() {
        return (
            <div className='vp-loader'>
                {!this.props.loading && this.props.children}
            </div>
        );
    }
}

export default connect(
    state => ({ loading: state.game.loading }),
)(Loader);