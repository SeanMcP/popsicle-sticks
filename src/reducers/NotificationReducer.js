// NotificationReducer.js
import { NOTIFICATION_ACTIONS } from '../actions/NotificationActions';

const initialState = {
    modalName: '',
    modalProps: {},
    notificationMessage: '',
    notificationType: '',
};

const NotificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case NOTIFICATION_ACTIONS.CLEAR_MODAL:
            return Object.assign({}, state, {
                modalName: '',
                modalProps: {}
            });
        case NOTIFICATION_ACTIONS.SET_MODAL:
            return Object.assign({}, state, {
                modalName: action.data.name,
                modalProps: action.data.props
            });
        case NOTIFICATION_ACTIONS.SET_NOTIFICATION:
            return Object.assign({}, state, {
                notificationMessage: action.data.message,
                notificationType: action.data.type
            });
        default:
            return state; 
    }
};

export default NotificationReducer;