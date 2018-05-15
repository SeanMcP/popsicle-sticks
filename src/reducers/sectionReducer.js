// sectionReducer.js
import { SECTION_ACTIONS } from '../actions/sectionActions';

const initialState = {
    list: []
};

const sectionReducer = (state = initialState, action) => {
    switch (action.type) {
        case SECTION_ACTIONS.SET_SECTIONS:
            return Object.assign({}, state, {
                list: action.data
            });
        default:
            return state; 
    }
};

export default sectionReducer;