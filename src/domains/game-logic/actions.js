export const SET_ATTRIBUTES = 'SET_ATTRIBUTES';
export const SET_VALUES = 'SET_VALUES';
export const SET_GAME_MODE = 'SET_GAME_MODE';

export const setAttributes = ({columnDigits, rowDigits}) => ({
    type: SET_ATTRIBUTES,
    payload: {columnDigits, rowDigits}
});

export const setValues = ({values}) => ({
    type: SET_VALUES,
    payload: {values}
});

export const setGameMode = ({gameMode}) => ({
    type: SET_GAME_MODE,
    payload: {gameMode}
});
