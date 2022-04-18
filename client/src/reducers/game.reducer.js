import {GET_LOG, GET_STATE, HIDE_LOADING, MARK, RESET, SHOW_LOADING} from '../actions/types';

const initialState = {
    message: 'Loading...',
    loading: false,
    gameOver: false,
    grid: null,
    turnFor: 'X',
    log: []
};

export const game = (state = initialState, action) => {
    switch (action.type) {
    case SHOW_LOADING:
        return { ...state, loading: true };
    case HIDE_LOADING:
        return { ...state, loading: false };
    case RESET:
        return { ...state, ...action.payload, ...{ turnFor: 'X' } };
    case MARK:
        return { ...state, ...action.payload, ...{ turnFor: state.turnFor === 'X' ? 'O' : 'X' } };
    case GET_STATE:
        return { ...state, ...action.payload };
    case GET_LOG:
        return { ...state, ...{ log: action.payload } };
    default:
        return state;
    }
};
