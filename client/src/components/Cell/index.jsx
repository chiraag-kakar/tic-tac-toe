import React, { Component } from 'react';

import './style.scss';

class Cell extends Component {

    constructor() {
        super();
        this.state = {
            isMarked: false,
            owner: null
        };
        this.markHandler = this.markHandler.bind(this);
    }

    componentDidMount() {
        this.setState({
            owner: this.props.takenBy === null ? null : this.props.takenBy,
            isMarked: this.props.takenBy !== null
        });
    }

    markHandler(x, y, owner) {
        this.setState({
            isMarked: true,
            owner
        });
        this.props.click(x, y);
    }

    render() {
        return (
            <div className="cell" onClick={() => !this.state.isMarked && this.markHandler(this.props.x, this.props.y, this.props.owner)}>
                {this.props.takenBy && <span className="owner">{this.props.takenBy}</span>}
            </div>
        );
    }
}

export default Cell;