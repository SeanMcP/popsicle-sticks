// StudentReducer.js
import { STUDENT_ACTIONS } from '../actions';

const initialState = {
    list: {}
};

const StudentReducer = (state = initialState, action) => {
    switch (action.type) {
        case STUDENT_ACTIONS.SET_STUDENTS:
            return Object.assign({}, state, {
                list: action.data
            });
        default:
            return state; 
    }
};

export default StudentReducer;