// StudentActions.js
import db from '../firebase';
import { setNotification } from '../actions';

export const STUDENT_ACTIONS = {
    SET_STUDENT: 'SET_STUDENT',
    SET_STUDENTS: 'SET_STUDENTS'
};

export const addStudent = (name, gender, section_id, current_level) => {
    return (dispatch) => {
        const sections = { [section_id]: current_level };
        db
            .collection('students')
            .add({ name, gender, sections })
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

export const getStudent = (student_id) => {
    return (dispatch) => {
        db
            .collection('students')
            .doc(student_id)
            .onSnapshot((doc) => {
                // const output = {};
                // querySnapshot.forEach((doc) => {
                //     output[doc.id] = doc.data();
                // });
                return dispatch({
                    type: STUDENT_ACTIONS.SET_STUDENT,
                    data: doc.data()
                });
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