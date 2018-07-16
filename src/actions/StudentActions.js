// StudentActions.js
import db from '../firebase';
import { setNotification } from '../actions';

export const STUDENT_ACTIONS = {
    SET_ALL_STUDENTS: 'SET_ALL_STUDENTS',
    SET_ATTENDANCE: 'SET_ATTENDANCE',
    SET_STUDENT: 'SET_STUDENT',
    SET_STUDENTS: 'SET_STUDENTS'
};

export const addStudent = (name, gender, sectionId, currentLevel) => {
    return (dispatch) => {
        const sections = { [sectionId]: currentLevel };
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

export const addExistingStudent = (studentId, sectionId, currentLevel) => {
    return (dispatch) => {
        const section = `sections.${sectionId}`;
        db
            .collection('students')
            .doc(studentId)
            .update({ [section]: currentLevel })
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

export const getStudent = (studentId) => {
    return (dispatch) => {
        db
            .collection('students')
            .doc(studentId)
            .onSnapshot((doc) => {
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
                    type: STUDENT_ACTIONS.SET_ALL_STUDENTS,
                    data: output
                });
            });
    };
};

export const getStudentsBySection = (sectionId) => {
    return (dispatch) => {
        db
            .collection('students')
            .where(`sections.${sectionId}`, '>', '0')
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

export const removeStudentFromSection = (studentId, sectionId) => {
    return (dispatch) => {
        const section = `sections.${sectionId}`;
        db
            .collection('students')
            .doc(studentId)
            .update({
                [section]: ''
            })
            .then(() => {
                dispatch(setNotification({
                    type: 'SUCCESS',
                    message: 'Successfully removed student'
                }));
            })
            .catch(error => {
                dispatch(setNotification({
                    type: 'FAILURE',
                    message: 'Failed to remove student',
                    error
                }));
            });
    };
};

export const setAttendance = (sectionId, attendanceArray) => {
    return (dispatch, getState) => {
        const { attendance } = getState().students;
        attendance[sectionId] = attendanceArray;

        return dispatch({
            type: STUDENT_ACTIONS.SET_ATTENDANCE,
            data: attendance
        });
    };
};

export const updateStudentInfo = (id, name, gender) => {
    return (dispatch) => {
        db
            .collection('students')
            .doc(id)
            .update({
                'name': name,
                'gender': gender
            })
            .then(() => {
                dispatch(setNotification({
                    type: 'SUCCESS',
                    message: 'Successfully updated student'
                }));
            })
            .catch(error => {
                dispatch(setNotification({
                    type: 'FAILURE',
                    message: 'Failed to update student',
                    error
                }));
            });
    };
};

export const updateStudentLevel = (studentId, sectionId, newLevel) => {
    return (dispatch) => {
        db
            .collection('students')
            .doc(studentId)
            .set({
                sections: {
                    [sectionId]: newLevel
                }
            }, { merge: true })
            .then(() => {
                dispatch(setNotification({
                    type: 'SUCCESS',
                    message: 'Successfully updated level!'
                }));
            })
            .catch((error) => {
                dispatch(setNotification({
                    type: 'FAILURE',
                    message: 'Failed to updated level',
                    error
                }));
            });
    };
};