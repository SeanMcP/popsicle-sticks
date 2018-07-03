// StudentActions.js
import db from '../firebase';
import { setNotification } from '../actions';

export const STUDENT_ACTIONS = {
    SET_STUDENTS: 'SET_STUDENTS'
};

export const addSection = (name, gender, section_id) => {
    return (dispatch) => {
        const section_array = [ section_id ];
        db
            .collection('students')
            .add({ name, gender, section_array })
            .then(() => {
                dispatch(setNotification({
                    type: 'SUCCESS',
                    message: 'Successfully added student'
                }));
            })
            .catch(error => {
                dispatch(setNotification({
                    type: 'FAILURE',
                    message: 'Failed to add student',
                    error
                }));
            });
    };
};

export const getAllStudents = () => {
    return (dispatch) => {
        db
            .collection('students')
            .onSnapshot((querySnapshot) => {
                const output = {};
                querySnapshot.forEach((doc) => {
                    output[doc.id] = doc.data();
                });
                return dispatch({
                    type: STUDENT_ACTIONS.SET_STUDENTS,
                    data: output
                });
            });
    };
};

export const getStudentsBySection = (section_id) => {
    return (dispatch) => {
        db
            .collection('students')
            .where(`sections.${section_id}`, '>', '0')
            .onSnapshot((querySnapshot) => {
                const output = {};
                querySnapshot.forEach((doc) => {
                    output[doc.id] = doc.data();
                });
                return dispatch({
                    type: STUDENT_ACTIONS.SET_STUDENTS,
                    data: output
                });
            });
    };
};