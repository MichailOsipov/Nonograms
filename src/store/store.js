import {createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {routerMiddleware} from 'connected-react-router';
import {rootReducer} from './root-reducer';
import {history} from './history';

const reduxLogger = window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__({ maxAge: 10 }) : f => f;

export const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk, routerMiddleware(history)),
        reduxLogger
    )
);
