import {times} from 'lodash';

import {SET_ATTRIBUTES, SET_VALUES, SET_GAME_MODE} from './actions';

// const COLUMN_DIGITS = [
//     [1],
//     [3],
//     [5],
//     [3, 1],
//     [6, 2],
//     [2, 2, 2],
//     [1, 1, 1],
//     [1, 2, 2],
//     [3, 3],
//     [1]
// ];

// const ROW_DIGITS = [
//     [3],
//     [2, 1],
//     [1, 1, 2],
//     [1, 1],
//     [4, 1],
//     [5, 2],
//     [5, 1],
//     [2, 2],
//     [6],
//     [2]
// ];

const COLUMN_DIGITS = [
    [2],
    [5],
    [7],
    [9],
    [9],
    [10, 2],
    [3, 6, 4],
    [3, 1, 5, 4],
    [8, 5, 5],
    [9, 10],
    [10, 4, 3],
    [10, 4, 4],
    [4, 3, 5, 11],
    [7, 4, 5, 6, 3],
    [9, 6, 3, 7],
    [18, 8],
    [30],
    [29, 2],
    [3, 27],
    [3, 2, 21, 3],
    [3, 19, 6],
    [8, 2, 11, 4],
    [6, 2, 9, 4],
    [5, 1, 1, 7, 3],
    [3, 2, 1, 4, 3],
    [2, 2, 1],
    [2, 1],
    [4],
    [4],
    [2]
];

const ROW_DIGITS = [
    [6],
    [9],
    [11],
    [5, 4],
    [6, 1, 4],
    [6, 1, 5],
    [6, 3, 4],
    [10, 4],
    [8, 2, 3],
    [7, 5],
    [8, 1],
    [10],
    [7],
    [8],
    [2, 12],
    [4, 15],
    [6, 17],
    [11, 11],
    [13, 10],
    [5, 7, 9],
    [4, 8, 9],
    [4, 7, 8],
    [4, 6, 9],
    [5, 3, 9],
    [5, 10],
    [16],
    [14],
    [13],
    [11, 1],
    [1, 5, 1, 1],
    [2, 1, 1, 3],
    [4, 3, 8],
    [9, 9],
    [9, 7],
    [7]
];

const INITIAL_VALUES = times(ROW_DIGITS.length, () => times(COLUMN_DIGITS.length, () => 'unknown'));

const DEFAULT_STATE = {
    rowDigits: ROW_DIGITS,
    columnDigits: COLUMN_DIGITS,
    values: INITIAL_VALUES,
    gameMode: 'play'
};

export const gameLogicReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case SET_ATTRIBUTES: {
            return {
                ...state,
                columnDigits: action.payload.columnDigits,
                rowDigits: action.payload.rowDigits
            };
        }
        case SET_VALUES: {
            return {
                ...state,
                values: action.payload.values
            };
        }
        case SET_GAME_MODE: {
            return {
                ...state,
                gameMode: action.payload.gameMode
            };
        }
        default:
            return state;
    }
};
