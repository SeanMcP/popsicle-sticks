// NotificationActions.js

export const NOTIFICATION_ACTIONS = {
    CLEAR_MODAL: 'CLEAR_MODAL',
    CLEAR_NOTIFICATION: 'CLEAR_NOTIFICATION',
    SET_MODAL: 'SET_MODAL',
    SET_NOTIFICATION: 'SET_NOTIFICATION'
}

export const clearModal = () => {
    return (dispatch) => {
        dispatch({
            type: NOTIFICATION_ACTIONS.CLEAR_MODAL
        });
    }
}

export const clearNotification = () => {
    return (dispatch) => {
        dispatch({
            type: NOTIFICATION_ACTIONS.CLEAR_NOTIFICATION
        });
    }
}

export const setModal = (modalData) => {
    return (dispatch) => {
        dispatch({
            type: NOTIFICATION_ACTIONS.SET_MODAL,
            data: modalData
        });
    }
}

export const setNotification = ({ error, message, type, clears }) => {
    return (dispatch) => {
        dispatch({
            type: NOTIFICATION_ACTIONS.SET_NOTIFICATION,
            data: { message, type, error },
        });
        if (clears !== false) {
            setTimeout(
                () => dispatch(clearNotification()),
                message.length * 100
            );
        }
    }
}