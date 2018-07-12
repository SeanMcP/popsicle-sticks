// NotificationReducer.js
import { NOTIFICATION_ACTIONS } from '../actions/NotificationActions';

const initialState = {
    message: '',
    modal: undefined,
    type: '',
};

const NotificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case NOTIFICATION_ACTIONS.CLEAR_MODAL:
            return Object.assign({}, state, {
                modal: undefined,
            });
        case NOTIFICATION_ACTIONS.SET_MODAL:
            return Object.assign({}, state, {
                modal: action.data.modal,
            });
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