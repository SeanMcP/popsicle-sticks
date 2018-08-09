// SessionReducer.js
import { SESSION_ACTIONS } from '../actions';

const initialState = {
    authenticated: false,
    user: {}
};

const SessionReducer = (state = initialState, action) => {
    switch (action.type) {
        case SESSION_ACTIONS.AUTHENTICATE:
            return Object.assign({}, state, {
                authenticated: true
            });
        case SESSION_ACTIONS.SET_USER:
            return Object.assign({}, state, {
                user: action.data
            });
        case SESSION_ACTIONS.SIGN_OUT:
            return Object.assign({}, state, {
                authenticated: false,
                user: {}
            });
        default:
            return state; 
    }
};

export default SessionReducer;