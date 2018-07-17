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

export const setModal = (name, props) => {
    return (dispatch) => {
        dispatch({
            type: NOTIFICATION_ACTIONS.SET_MODAL,
            data: {
                name,
                props
            }
        });
    }
}

export const setNotification = ({ error, message, type }) => {
    return (dispatch) => {
        dispatch({
            type: NOTIFICATION_ACTIONS.SET_NOTIFICATION,
            data: { message, type, error },
        });
    }
}