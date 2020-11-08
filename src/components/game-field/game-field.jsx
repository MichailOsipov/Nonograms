import React from 'react';
import PropTypes from 'prop-types';
import {findMaxArrayLength} from 'utils/find-max-array-length';
import {DigitCell} from './primitives/digitCell';
import {Cell} from './primitives/cell';
import {CELL_SIDE_WIDTH, CELL_STROKE_WIDTH} from './constants';


const ColumnDigits = ({columnDigits, columnDigitsHeight, rowDigitsWidth}) => (
    <React.Fragment>
        {columnDigits.map((colEl, colElIndex) => (
            <React.Fragment
                key={colElIndex} // eslint-disable-line
            >
                {colEl.map((colElEl, colElElIndex) => (
                    <DigitCell
                        key={colElElIndex} // eslint-disable-line
                        rowIndex={(columnDigitsHeight - colEl.length) + colElElIndex}
                        colIndex={rowDigitsWidth + colElIndex}
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
                        rowIndex={columnDigitsHeight + rowElIndex}
                        colIndex={(rowDigitsWidth - rowEl.length) + rowElElIndex}
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
        {columnDigits.map((_1, colIndex) => (
            <React.Fragment
                key={colIndex} // eslint-disable-line
            >
                <g>
                    {rowDigits.map((_2, rowIndex) => {
                        const type = values && values[rowIndex] && values[rowIndex][colIndex];
                        return (
                            <Cell
                                key={rowIndex} // eslint-disable-line
                                rowIndex={columnDigitsHeight + rowIndex}
                                colIndex={rowDigitsWidth + colIndex}
                                sideWidth={CELL_SIDE_WIDTH}
                                strokeWidth={CELL_STROKE_WIDTH}
                                type={type}
                            />
                        );
                    })}
                </g>
            </React.Fragment>
        ))}
    </React.Fragment>
);

Values.propTypes = {
    columnDigits: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
    rowDigits: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
    columnDigitsHeight: PropTypes.number,
    rowDigitsWidth: PropTypes.number,
    values: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.oneOf(['unknown', 'filled', 'empty'])))
};

export const GameField = ({columnDigits, rowDigits, values}) => {
    const columnDigitsHeight = findMaxArrayLength(columnDigits);
    const rowDigitsWidth = findMaxArrayLength(rowDigits);

    return (
        <svg
            height={(CELL_SIDE_WIDTH * (columnDigitsHeight + rowDigits.length)) + CELL_STROKE_WIDTH}
            width={(CELL_SIDE_WIDTH * (rowDigitsWidth + columnDigits.length)) + CELL_STROKE_WIDTH}
        >
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
    values: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.oneOf(['unknown', 'filled', 'empty'])))
};
