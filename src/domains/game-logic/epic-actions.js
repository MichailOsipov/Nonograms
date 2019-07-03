import {times, every} from 'lodash';
import {setValues} from './actions';
import {getAttributes, getValues} from './selectors';

const getInitialValues = ({columnDigits, rowDigits}) =>
    times(rowDigits.length, () => times(columnDigits.length, () => 'unknown'));

const checkIsSolved = values =>
    every(values, valueRow => every(valueRow, x => x !== 'unknown'));


const getPossibleValues = (row, digits) => {
    
};

export const getNewVector = (row, digits) => {
    const possibleValues = getPossibleValues(row, digits);
};

const updateRows = () => (dispatch, getState) => {
    const valuesRows = getValues(getState());
    const { rowDigits } = getAttributes(getState());

    const valuesWithNewRows = valuesRows.map((row, i) => getNewVector(row, rowDigits[i]));

    setValues(valuesWithNewRows);
};

const updateColumns = () => (dispatch, getState) => {
    const valuesRows = getValues(getState());
    const { columnDigits } = getAttributes(getState());

    const columns = transposeMatrix(valuesRows);
    const newColumns = columns.map((column, i) => getNewVector(column, columnDigits[i]));

    const valuesWithNewColumns = transposeMatrix(newColumns);
    dispatch(setValues(valuesWithNewColumns));
};

const makeGameIteration = () => (dispatch) => {
    dispatch(updateRows());
    dispatch(updateColumns());
};

export const solveNonogram = () => (dispatch, getState) => {
    const {columnDigits, rowDigits} = getAttributes(getState());
    dispatch(setValues({values: getInitialValues({columnDigits, rowDigits})}));

    const timerId = setInterval(() => {
        const solved = checkIsSolved(getValues(getState()));
        if (solved) {
            clearInterval(timerId);
            return;
        }
        dispatch(makeGameIteration());
    }, 1000);
};
