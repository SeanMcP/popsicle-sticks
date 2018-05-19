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
        db.collection('sections').get().then((querySnapshot) => {
            const output = {};
            querySnapshot.forEach((doc) => {
                output[doc.id] = doc.data();
                // console.log(`${doc.id} => ${doc.data().name}`);
            });
            // console.log(output);
            dispatch(setSections(output));
            // console.log(querySnapshot);
        });
        // const sectionRef = firebase.database().ref('sections');
        // sectionRef.on('value', (snapshot) => {
        //     const sections = snapshot.val();
        //     const newState = [];
        //     for (const section in sections) {
        //         newState.push({
        //             id: section,
        //             name: sections[section].name,
        //             type: sections[section].type
        //         });
        //     }
        //     this.props.setSections(newState);
        // });
    }
}

export const setSections = (data) => {
    return {
        data,
        type: SECTION_ACTIONS.SET_SECTIONS
    }
};