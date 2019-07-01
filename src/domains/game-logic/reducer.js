import {SET_ATTRIBUTES, SET_VALUES} from './actions';

const DEFAULT_STATE = {
    rowDigits: [],
    columnDigits: [],
    values: []
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
        default:
            return state;
    }
};
