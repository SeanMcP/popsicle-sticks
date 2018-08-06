// SessionActions.js

export const SESSION_ACTIONS = {
    AUTHENTICATE: 'AUTHENTICATE',
    SET_USER: 'SET_USER',
};

export const authenticateUser = (user) => {
    return (dispatch) => {
        dispatch({
            type: SESSION_ACTIONS.AUTHENTICATE
        });
        dispatch({
            type: SESSION_ACTIONS.SET_USER,
            data: user
        });
    }
} 