// SessionActions.js
import {
    push
} from 'connected-react-router';
import {
    auth
} from '../firebase';
import {
    setNotification
} from '../actions';
import {
    PATH
} from '../constants';

export const SESSION_ACTIONS = {
    AUTHENTICATE: 'AUTHENTICATE',
    SET_USER: 'SET_USER',
    SIGN_OUT: 'SIGN_OUT',
};

export const authenticateUser = (user) => {
    return (dispatch) => {
        localStorage.setItem('userAuth', true);
        localStorage.setItem('userEmail', user.email);
        localStorage.setItem('userUid', user.uid);
        dispatch({
            type: SESSION_ACTIONS.AUTHENTICATE
        });
        dispatch({
            type: SESSION_ACTIONS.SET_USER,
            data: user
        });
    }
}

export const userCreateWithEmailAndPassword = (email, password) => {
    return (dispatch) => {
        auth.createUserWithEmailAndPassword(email, password)
            .then(() => {
                dispatch(push(PATH.schedule));
            })
            .catch(error => {
                dispatch(setNotification({
                    type: 'FAILURE',
                    message: error.message,
                    error
                }));
            });
    }
}

export const userPasswordReset = (email) =>
    auth.sendPasswordResetEmail(email);

export const userPasswordUpdate = (password) =>
    auth.currentUser.updatePassword(password);

export const userSignInWithEmailAndPassword = (email, password) => {
    return (dispatch) => {
        auth.signInWithEmailAndPassword(email, password)
            .then(() => {
                dispatch(push(PATH.auth));
            })
            .catch((error) => {
                dispatch(setNotification({
                    type: 'FAILURE',
                    message: error.message,
                    error
                }));
            });
    }
}

export const userSignOut = () => {
    return (dispatch) => {
        auth.signOut()
            .then(() => {
                dispatch({
                    type: SESSION_ACTIONS.SIGN_OUT
                });
                localStorage.removeItem('userAuth');
                localStorage.removeItem('userEmail');
                localStorage.removeItem('userUid');
                localStorage.getItem('userAuth');
                dispatch(push(PATH.root));
            })
            .catch((error) => {
                dispatch(setNotification({
                    type: 'FAILURE',
                    message: error.message,
                    error
                }));
            });;
    }
}