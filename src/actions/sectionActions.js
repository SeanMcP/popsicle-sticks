// SectionActions.js
import db from '../firebase';
import { setNotification } from '../actions';

export const SECTION_ACTIONS = {
    SET_SECTIONS: 'SET_SECTIONS'
};

export const addSection = (name, type, description) => {
    return (dispatch) => {
        db
            .collection('sections')
            .add({ name, type, description })
            .then(() => {
                dispatch(setNotification({
                    type: 'SUCCESS',
                    message: 'Section successfully added'
                }));
            })
            .catch(error => {
                dispatch(setNotification({
                    type: 'FAILURE',
                    message: 'Section failed to add',
                    error
                }));
            });
    }
}

export const getSections = () => {
    return (dispatch) => {
        db.collection('sections').onSnapshot((querySnapshot) => {
            const output = {};
            querySnapshot.forEach((doc) => {
                output[doc.id] = doc.data();
            });
            return dispatch({
                type: SECTION_ACTIONS.SET_SECTIONS,
                data: output
            });
        });
    }
}

export const updateSection = (id, name, type) => {
    return (dispatch) => {
        db
            .collection('sections')
            .doc(id)
            .update({
                'name': name,
                'type': type
            })
            .then(() => {
                dispatch(setNotification({
                    type: 'SUCCESS',
                    message: 'Successfully updated section'
                }));
            })
            .catch(error => {
                dispatch(setNotification({
                    type: 'FAILURE',
                    message: 'Failed to update section',
                    error
                }));
            });
    };
};