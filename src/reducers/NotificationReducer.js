// NotificationReducer.js
import { NOTIFICATION_ACTIONS } from '../actions/NotificationActions';

const initialState = {
    message: '',
    type: '',
};

const NotificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case NOTIFICATION_ACTIONS.SET_NOTIFICATION:
            return Object.assign({}, state, {
                message: action.data.message,
                type: action.data.type
            });
        default:
            return state; 
    }
};

export default NotificationReducer;