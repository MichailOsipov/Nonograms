import {createSelector} from 'reselect';
import {getDomain} from 'store/root-selector';
import {GAME_LOGIC_STORE_KEY} from './store-key';

const getGameLogicDomain = getDomain(GAME_LOGIC_STORE_KEY);

export const getGameAttributes = createSelector(
    getGameLogicDomain,
    ({columnDigits, rowDigits}) => ({columnDigits, rowDigits})
);

export const getGameValues = createSelector(
    getGameLogicDomain,
    ({values}) => values
);
