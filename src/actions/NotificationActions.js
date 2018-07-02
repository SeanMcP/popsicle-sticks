// NotificationActions.js

export const NOTIFICATION_ACTIONS = {
    SET_NOTIFICATION: 'SET_NOTIFICATION'
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