import {times} from 'lodash';
import {setValues} from './actions';
import {getGameAttributes} from './selectors';

const getInitialValues = ({columnDigits, rowDigits}) =>
    times(rowDigits.length, () => times(columnDigits.length, () => 'unknown'));

export const solveNonogram = () => (dispatch, getState) => {
    const {columnDigits, rowDigits} = getGameAttributes(getState());
    const initialValues = getInitialValues({columnDigits, rowDigits});
    dispatch(setValues({values: initialValues}));
};
