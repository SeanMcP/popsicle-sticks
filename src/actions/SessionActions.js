// SessionActions.js
import { push } from 'connected-react-router';
import { auth } from '../firebase';
import { setNotification } from '../actions';
import { PATH } from '../constants';

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

export const userSignInWithEmailAndPassword = (email, password) =>
    auth.signInWithEmailAndPassword(email, password);

export const userSignOut = () =>
    auth.signOut();