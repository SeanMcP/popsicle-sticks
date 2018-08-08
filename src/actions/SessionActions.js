// SessionActions.js
import { auth } from '../firebase';

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

export const userCreateWithEmailAndPassword = (email, password) =>
    auth.createUserWithEmailAndPassword(email, password);

export const userPasswordReset = (email) =>
    auth.sendPasswordResetEmail(email);

export const userPasswordUpdate = (password) =>
    auth.currentUser.updatePassword(password);

export const userSignInWithEmailAndPassword = (email, password) =>
    auth.signInWithEmailAndPassword(email, password);

export const userSignOut = () =>
    auth.signOut();