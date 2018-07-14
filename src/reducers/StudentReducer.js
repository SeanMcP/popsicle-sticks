// StudentReducer.js
import { STUDENT_ACTIONS } from '../actions';

const initialState = {
    all: {},
    attendance: {},
    list: {},
    student: {}
};

const StudentReducer = (state = initialState, action) => {
    switch (action.type) {
        case STUDENT_ACTIONS.SET_ATTENDANCE:
            return Object.assign({}, state, {
                attendance: action.data
            });
        case STUDENT_ACTIONS.SET_ALL_STUDENTS:
            return Object.assign({}, state, {
                all: action.data
            });
        case STUDENT_ACTIONS.SET_STUDENT:
            return Object.assign({}, state, {
                student: action.data
            });
        case STUDENT_ACTIONS.SET_STUDENTS:
            return Object.assign({}, state, {
                list: action.data
            });
        default:
            return state; 
    }
};

export default StudentReducer;