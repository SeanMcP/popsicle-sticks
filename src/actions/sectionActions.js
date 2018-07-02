// sectionActions.js
import db from '../firebase';

export const SECTION_ACTIONS = {
    SET_SECTIONS: 'SET_SECTIONS'
};

export const addSection = (name, type, description) => {
    return () => {
        db
            .collection('sections')
            .add({ name, type, description })
            .then(() => {
                console.log('Document successfully written!');
            })
            .catch(error => {
                console.error('Error writing document: ', error);
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
            dispatch(setSections(output));
        });
    }
}

export const setSections = (data) => {
    return {
        data,
        type: SECTION_ACTIONS.SET_SECTIONS
    }
};