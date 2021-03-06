import React from 'react';
import PropTypes from 'prop-types';

export const DigitCell = ({
    rowIndex,
    colIndex,
    sideWidth,
    strokeWidth,
    value
}) => (
    <React.Fragment>
        <rect
            x={colIndex * sideWidth + 1}
            y={rowIndex * sideWidth + 1}
            width={sideWidth}
            height={sideWidth}
            stroke="black"
            strokeWidth={strokeWidth}
            fill="#d0d0d0"
        />
        <text x={(colIndex * sideWidth) + 5} y={(rowIndex * sideWidth) + 15}>
            {value}
        </text>
    </React.Fragment>
);

DigitCell.propTypes = {
    rowIndex: PropTypes.number,
    colIndex: PropTypes.number,
    sideWidth: PropTypes.number,
    strokeWidth: PropTypes.number,
    value: PropTypes.number
};
