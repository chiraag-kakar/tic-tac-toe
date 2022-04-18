import React, { Component } from 'react';
import { connect } from 'react-redux';

import { mark, getState, reset } from '../../actions/game.actions';

import Cell from '../Cell';

import './style.scss';

class Grid extends Component {

    constructor() {
        super();
        this.getCellOwner = this.getCellOwner.bind(this);
    }

    componentDidMount() {
        this.props.getState();
    }

    getCellOwner(x, y) {
        const grid = this.props.grid;
        if (grid !== null) {
            return grid[y][x];
        }
        return null;
    }

    generateGrid(size) {
        const gridCells = [];
        for (let y = 0; y < size; y++) {
            for (let x = 0; x < size; x++) {
                gridCells.push(
                    <Cell x={x}
                        y={y}
                        owner={this.props.owner}
                        click={this.props.mark}
                        key={`${x}:${y}`}
                        takenBy={this.getCellOwner(x, y)}
                    />
                );
            }
        }
        return gridCells;
    }

    render() {
        return (
            <div className='vp-grid'>
                {!this.props.gameOver &&
                    <div className="grid">
                        {this.generateGrid(3)}
                    </div>
                }
                {this.props.gameOver && <button className="btn" onClick={() => this.props.reset()}>Restart!</button>}
            </div>
        );
    }
}

export default connect(
    state => ({
        loading: state.game.loading,
        owner: state.game.turnFor,
        gameOver: state.game.gameOver,
        grid: state.game.grid
    }),
    { getState, mark, reset }
)(Grid);