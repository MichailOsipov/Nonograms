import React from 'react';
import {connect} from 'react-redux';
import {
    setAttributes,
    solveNonogram,
    getGameAttributes,
    getGameValues
} from 'domains/game-logic';
import {GameField} from 'components/game-field';

const COLUMN_DIGITS = [
    [1],
    [3],
    [5],
    [3, 1],
    [6, 2],
    [2, 2, 2],
    [1, 1, 1],
    [1, 2, 2],
    [3, 3],
    [1]
];

const ROW_DIGITS = [
    [3],
    [2, 1],
    [1, 1, 2],
    [1, 1],
    [4, 1],
    [5, 2],
    [5, 1],
    [2, 2],
    [6],
    [2]
];

// rows first
const VALUES = [
    ['unknown', 'unknown', 'unknown', 'unknown', 'unknown', 'unknown', 'unknown', 'unknown', 'unknown', 'unknown'],
    ['unknown', 'unknown', 'unknown', 'unknown', 'unknown', 'unknown', 'unknown', 'unknown', 'unknown', 'unknown'],
    ['unknown', 'unknown', 'unknown', 'unknown', 'unknown', 'unknown', 'unknown', 'unknown', 'unknown', 'unknown'],
    ['unknown', 'unknown', 'unknown', 'unknown', 'unknown', 'unknown', 'unknown', 'unknown', 'unknown', 'unknown'],
    ['unknown', 'unknown', 'unknown', 'unknown', 'unknown', 'unknown', 'unknown', 'unknown', 'unknown', 'unknown'],
    ['unknown', 'unknown', 'unknown', 'unknown', 'unknown', 'unknown', 'unknown', 'unknown', 'unknown', 'unknown'],
    ['unknown', 'unknown', 'unknown', 'unknown', 'unknown', 'unknown', 'unknown', 'unknown', 'unknown', 'unknown'],
    ['unknown', 'unknown', 'unknown', 'unknown', 'unknown', 'unknown', 'unknown', 'unknown', 'unknown', 'unknown'],
    ['unknown', 'unknown', 'unknown', 'unknown', 'unknown', 'unknown', 'unknown', 'unknown', 'unknown', 'unknown'],
    ['unknown', 'unknown', 'unknown', 'unknown', 'unknown', 'unknown', 'unknown', 'unknown', 'unknown', 'unknown']
];

export const MainPage = connect(
    state => ({
        gameAttributes: getGameAttributes(state),
        gameValues: getGameValues(state)
    }),
    dispatch => ({
        setGameAttributes: ({rowDigits, columnDigits}) => dispatch(setAttributes({rowDigits, columnDigits})),
        solveGameNonogram: () => dispatch(solveNonogram())
    })
)(({
    gameAttributes,
    gameValues,
    setGameAttributes,
    solveGameNonogram
}) => (
    <div>
        <GameField
            columnDigits={gameAttributes.columnDigits}
            rowDigits={gameAttributes.rowDigits}
            values={gameValues}
        />
        <button
            onClick={() => {
                setGameAttributes({rowDigits: ROW_DIGITS, columnDigits: COLUMN_DIGITS});
                solveGameNonogram();
            }}
        >
            Start Solving
        </button>
    </div>
));
