// SectionReducer.js
import { SECTION_ACTIONS } from '../actions/SectionActions';

const initialState = {
    list: {}
};

const SectionReducer = (state = initialState, action) => {
    switch (action.type) {
        case SECTION_ACTIONS.SET_SECTIONS:
            return Object.assign({}, state, {
                list: action.data
            });
        default:
            return state; 
    }
};

export default SectionReducer;