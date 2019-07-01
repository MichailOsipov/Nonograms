import React from 'react';
import PropTypes from 'prop-types';
import {findMaxArrayLength} from 'utils/find-max-array-length';
import {DigitCell} from './primitives/digitCell';
import {Cell} from './primitives/cell';

const CELL_SIDE_WIDTH = 20;
const CELL_STROKE_WIDTH = 2;

const ColumnDigits = ({columnDigits, columnDigitsHeight, rowDigitsWidth}) => (
    <React.Fragment>
        {columnDigits.map((colEl, colElIndex) => (
            <React.Fragment
                key={colElIndex} // eslint-disable-line
            >
                {colEl.map((colElEl, colElElIndex) => (
                    <DigitCell
                        key={colElElIndex} // eslint-disable-line
                        rowIndex={(columnDigitsHeight - colEl.length) + 1 + colElElIndex}
                        colIndex={rowDigitsWidth + colElIndex + 1}
                        sideWidth={CELL_SIDE_WIDTH}
                        strokeWidth={CELL_STROKE_WIDTH}
                        value={colElEl}
                    />
                ))}
            </React.Fragment>
        ))}
    </React.Fragment>
);

ColumnDigits.propTypes = {
    columnDigits: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
    columnDigitsHeight: PropTypes.number,
    rowDigitsWidth: PropTypes.number
};

const RowDigits = ({rowDigits, columnDigitsHeight, rowDigitsWidth}) => (
    <React.Fragment>
        {rowDigits.map((rowEl, rowElIndex) => (
            <React.Fragment
                key={rowElIndex} // eslint-disable-line
            >
                {rowEl.map((rowElEl, rowElElIndex) => (
                    <DigitCell
                        key={rowElElIndex} // eslint-disable-line
                        rowIndex={columnDigitsHeight + rowElIndex + 1}
                        colIndex={(rowDigitsWidth - rowEl.length) + 1 + rowElElIndex}
                        sideWidth={CELL_SIDE_WIDTH}
                        strokeWidth={CELL_STROKE_WIDTH}
                        value={rowElEl}
                    />
                ))}
            </React.Fragment>
        ))}
    </React.Fragment>
);

RowDigits.propTypes = {
    rowDigits: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
    columnDigitsHeight: PropTypes.number,
    rowDigitsWidth: PropTypes.number
};

const Values = ({columnDigits, rowDigits, columnDigitsHeight, rowDigitsWidth, values}) => (
    <React.Fragment>
        {columnDigits.map((colEl, colIndex) => (
            <React.Fragment
                key={colIndex} // eslint-disable-line
            >
                {rowDigits.map((rowEl, rowIndex) => (
                    <Cell
                        key={rowIndex} // eslint-disable-line
                        rowIndex={columnDigitsHeight + rowIndex + 1}
                        colIndex={rowDigitsWidth + colIndex + 1}
                        sideWidth={CELL_SIDE_WIDTH}
                        strokeWidth={CELL_STROKE_WIDTH}
                        type={values[rowIndex][colIndex]}
                    />
                ))}
            </React.Fragment>
        ))}
    </React.Fragment>
);

Values.propTypes = {
    columnDigits: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
    rowDigits: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
    columnDigitsHeight: PropTypes.number,
    rowDigitsWidth: PropTypes.number,
    values: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number))
};

export const GameField = ({columnDigits, rowDigits, values}) => {
    const columnDigitsHeight = findMaxArrayLength(columnDigits);
    const rowDigitsWidth = findMaxArrayLength(rowDigits);

    return (
        <svg height={500} width={500}>
            <ColumnDigits
                columnDigits={columnDigits}
                columnDigitsHeight={columnDigitsHeight}
                rowDigitsWidth={rowDigitsWidth}
            />
            <RowDigits
                rowDigits={rowDigits}
                columnDigitsHeight={columnDigitsHeight}
                rowDigitsWidth={rowDigitsWidth}
            />
            <Values
                columnDigits={columnDigits}
                rowDigits={rowDigits}
                columnDigitsHeight={columnDigitsHeight}
                rowDigitsWidth={rowDigitsWidth}
                values={values}
            />
        </svg>
    );
};

GameField.propTypes = {
    columnDigits: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
    rowDigits: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
    values: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number))
};
