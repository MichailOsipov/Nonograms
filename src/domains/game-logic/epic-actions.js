import {times, every} from 'lodash';
import {setAttributes, setValues} from './actions';
import {getAttributes, getValues} from './selectors';
import {solutionGenerator} from './solution-generator';
import {getInputRows, getInputCells} from '../edit-form';

const getInitialValues = ({columnDigitsLength, rowDigitsLength}) =>
    times(rowDigitsLength, () => times(columnDigitsLength, () => 'unknown'));

const checkIsSolved = values =>
    every(values, valueRow => every(valueRow, x => x !== 'unknown'));

const mergeSolution = (vector, solution) => {
    if (!vector) {
        return [...solution];
    }

    return vector.map((element, i) => {
        if (element === solution[i]) {
            return element;
        }

        return 'unknown';
    });
};

const transposeMatrix = (rows) => {
    const columns = [];
    for (let i = 0; i < rows[0].length; i += 1) {
        columns[i] = [];
        for (let j = 0; j < rows.length; j += 1) {
            columns[i][j] = rows[j][i];
        }
    }
    return columns;
};

const getNewVector = (row, digits) => {
    const generator = solutionGenerator(row, digits);
    let isComplete = false;
    let newVector;

    while (!isComplete) {
        const { value: solution, done } = generator.next();
        if (!done) {
            newVector = mergeSolution(newVector, solution);
        }
        isComplete = done;
    }

    return newVector;
};

const updateRows = () => (dispatch, getState) => {
    const valuesRows = getValues(getState());
    const { rowDigits } = getAttributes(getState());

    const valuesWithNewRows = valuesRows.map((row, i) => getNewVector(row, rowDigits[i]));

    dispatch(setValues({values: valuesWithNewRows}));
    return Promise.resolve();
};

const updateColumns = () => (dispatch, getState) => {
    const valuesRows = getValues(getState());
    const { columnDigits } = getAttributes(getState());

    const columns = transposeMatrix(valuesRows);
    const newColumns = columns.map((column, i) => getNewVector(column, columnDigits[i]));

    const valuesWithNewColumns = transposeMatrix(newColumns);
    dispatch(setValues({values: valuesWithNewColumns}));
    return Promise.resolve();
};

const waitOneSecond = () => new Promise(resolve => setTimeout(() => resolve(), 1000));

const makeGameIteration = () => dispatch =>
    dispatch(updateRows())
        .then(waitOneSecond)
        .then(() => dispatch(updateColumns()));


export const solveNonogram = () => (dispatch, getState) => {
    const {columnDigits, rowDigits} = getAttributes(getState());
    dispatch(setValues({values: getInitialValues({
        columnDigitsLength: columnDigits.length,
        rowDigitsLength: rowDigits.length
    })}));

    const callIterationCycle = () => requestAnimationFrame(() => {
        const solved = checkIsSolved(getValues(getState()));
        if (!solved) {
            dispatch(makeGameIteration())
                .then(waitOneSecond)
                .then(callIterationCycle);
        }
    });
    callIterationCycle();
};

const parseAttributres = (inputAttributes) => {
    const attributeRows = inputAttributes.split('\n');
    return attributeRows.map((attributeRow) => {
        const attributeCells = attributeRow.split(' ');
        return attributeCells.map(Number);
    });
};

export const applyNewAttributes = () => (dispatch, getState) => {
    const inputRows = getInputRows(getState());
    const inputCells = getInputCells(getState());
    const newRows = parseAttributres(inputRows);
    const newCells = parseAttributres(inputCells);
    const newValues = getInitialValues({columnDigitsLength: newCells.length, rowDigitsLength: newRows.length});

    dispatch(setValues({values: newValues}));
    dispatch(setAttributes({columnDigits: newCells, rowDigits: newRows}));
};
