import React from 'react';
import PropTypes from 'prop-types';
import {CELL_STROKE_WIDTH} from '../constants';

const TYPE_TO_COLOR = {
    unknown: 'white',
    filled: '#262626',
    empty: '#d4d4d4'
};

export const Cell = ({
    rowIndex,
    colIndex,
    sideWidth,
    strokeWidth,
    type
}) => (
    <rect
        x={(colIndex * sideWidth) + (CELL_STROKE_WIDTH / 2)}
        y={(rowIndex * sideWidth) + (CELL_STROKE_WIDTH / 2)}
        width={sideWidth}
        height={sideWidth}
        stroke="black"
        strokeWidth={strokeWidth}
        fill={TYPE_TO_COLOR[type]}
    />
);

Cell.propTypes = {
    rowIndex: PropTypes.number,
    colIndex: PropTypes.number,
    sideWidth: PropTypes.number,
    strokeWidth: PropTypes.number,
    type: PropTypes.oneOf(['unknown', 'filled', 'empty'])
};
