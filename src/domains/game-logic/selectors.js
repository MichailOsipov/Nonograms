import {createSelector} from 'reselect';
import {getDomain} from 'store/root-selector';
import {GAME_LOGIC_STORE_KEY} from './store-key';

const getGameLogicDomain = getDomain(GAME_LOGIC_STORE_KEY);

export const getAttributes = createSelector(
    getGameLogicDomain,
    ({columnDigits, rowDigits}) => ({columnDigits, rowDigits})
);

export const getValues = createSelector(
    getGameLogicDomain,
    ({values}) => values
);

export const getGameMode = createSelector(
    getGameLogicDomain,
    ({gameMode}) => gameMode,
);
