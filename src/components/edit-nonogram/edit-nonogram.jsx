import React from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';

import {EDIT_FORM_NAME} from 'domains/edit-form';
import {applyNewAttributes} from 'domains/game-logic';
import {INITIAL_VALUES} from './constants';


export const EditNonogram = connect(
    null,
    dispatch => ({
        onApplyAttributes: () => dispatch(applyNewAttributes())
    })
)(reduxForm({
    form: EDIT_FORM_NAME,
    initialValues: INITIAL_VALUES
})(({onApplyAttributes}) => (
    <div>
        <div>
            <button onClick={onApplyAttributes}>ApplyNewAttributes</button>
        </div>
        <div>Edit nonogram</div>
        Rows:
        <div>
            <Field component="textarea" name="rows" />
        </div>
        Cells:
        <div>
            <Field component="textarea" name="cells" />
        </div>
    </div>
)));
