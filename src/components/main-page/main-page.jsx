import React from 'react';
import {GameField} from 'components/game-field';

const COLUMN_DIGITS = [
    [2, 3, 4, 5, 6],
    [3, 4, 6, 7],
    [4, 5, 6, 7, 8, 9, 10],
    [3, 4, 5]
];

const ROW_DIGITS = [
    [2, 3],
    [4, 5, 6, 7],
    [2, 1, 3, 4, 5, 6, 7],
    [3, 4, 5, 6],
    [3, 4, 5, 6, 7, 8]
];

const VALUES = [
    ['unknown', 'unknown', 'unknown', 'unknown'],
    ['unknown', 'unknown', 'unknown', 'unknown'],
    ['unknown', 'filled', 'unknown', 'unknown'],
    ['unknown', 'unknown', 'unknown', 'unknown'],
    ['unknown', 'unknown', 'unknown', 'unknown']
];

export const MainPage = () => (
    <GameField columnDigits={COLUMN_DIGITS} rowDigits={ROW_DIGITS} values={VALUES} />
);
