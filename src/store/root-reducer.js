import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import {connectRouter} from 'connected-react-router';
import {gameLogicReducer, GAME_LOGIC_STORE_KEY} from 'domains/game-logic';
import {history} from './history';

export const rootReducer = combineReducers({
    form: formReducer,
    router: connectRouter(history),
    [GAME_LOGIC_STORE_KEY]: gameLogicReducer
});
