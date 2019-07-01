import React from 'react';
import PropTypes from 'prop-types';

const TYPE_TO_COLOR = {
    unknown: 'white',
    filled: 'black',
    empty: 'grey'
};

export const Cell = ({
    rowIndex,
    colIndex,
    sideWidth,
    strokeWidth,
    type
}) => (
    <rect
        x={colIndex * sideWidth}
        y={rowIndex * sideWidth}
        width={sideWidth}
        height={sideWidth}
        stroke="black"
        strokeWidth={strokeWidth}
        fill={TYPE_TO_COLOR[type] || 'white'}
    />
);

Cell.propTypes = {
    rowIndex: PropTypes.number,
    colIndex: PropTypes.number,
    sideWidth: PropTypes.number,
    strokeWidth: PropTypes.number,
    type: PropTypes.oneOf(['unknown', 'filled', 'empty'])
};
