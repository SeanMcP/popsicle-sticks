// sectionActions.js

export const SECTION_ACTIONS = {
    SET_SECTIONS: 'SET_SECTIONS'
};

export const setSections = (data) => {
    return {
        data,
        type: SECTION_ACTIONS.SET_SECTIONS
    }
};