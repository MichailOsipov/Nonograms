import {createSelector} from 'reselect';
import {EDIT_FORM_NAME} from './constants';

const getFormDomain = state => state.form;

const getEditForm = createSelector(
    getFormDomain,
    formDomain => formDomain[EDIT_FORM_NAME]
);

const getEditFormValues = createSelector(
    getEditForm,
    form => form.values
);

export const getInputRows = createSelector(
    getEditFormValues,
    values => values.rows
);

export const getInputCells = createSelector(
    getEditFormValues,
    values => values.cells
);
