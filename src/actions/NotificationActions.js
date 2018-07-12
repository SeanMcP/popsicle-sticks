// NotificationActions.js

export const NOTIFICATION_ACTIONS = {
    CLEAR_MODAL: 'CLEAR_MODAL',
    SET_MODAL: 'SET_MODAL',
    SET_NOTIFICATION: 'SET_NOTIFICATION'
};

export const clearModal = () => {
    return (dispatch) => {
        dispatch({
            type: NOTIFICATION_ACTIONS.CLEAR_MODAL
        });
    }
};

export const setModal = (modal) => {
    return (dispatch) => {
        dispatch({
            type: NOTIFICATION_ACTIONS.SET_MODAL,
            data: { modal }
        });
    }
};

export const setNotification = (type, message, error) => {
    return (dispatch) => {
        dispatch({
            type: NOTIFICATION_ACTIONS.SET_NOTIFICATION,
            data: { message, type },
            error
        });
    }
};