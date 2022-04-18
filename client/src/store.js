import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
import reduxThunk from 'redux-thunk';
import * as reducers from './reducers';

const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const enhancer = composeEnhancers(
    applyMiddleware(reduxThunk),
);

const reducer = combineReducers({...reducers});

const store = createStore(reducer, enhancer);

export default store;
