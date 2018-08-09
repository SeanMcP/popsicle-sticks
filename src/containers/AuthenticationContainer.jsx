import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { withRouter } from 'react-router-dom';
import { authenticateUser } from '../actions';
import { PATH } from '../constants';

class AuthenticationContainer extends Component {
    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // User is signed in.
                const userData = {
                    displayName: user.displayName,
                    email: user.email,
                    photoUrl: user.photoUrl,
                    uid: user.uid,
                }

                this.props.authenticateUser(userData);
                this.props.history.push(PATH.schedule);
                // var displayName = user.displayName;
                // var email = user.email;
                // var emailVerified = user.emailVerified;
                // var photoURL = user.photoURL;
                // var uid = user.uid;
                // var phoneNumber = user.phoneNumber;
                // var providerData = user.providerData;
                // user.getIdToken() // accessToken
            }
        }, (error) => {
            console.log(error);
        });
    }

    // componentDidUpdate(nextProps) {
    //     if (nextProps.authenticated)
    //         nextProps.history.push(PATH.schedule)
    // }

    render() {
        return (
            <div className="authentication container">
                <div className="loading" />
                Loading
            </div>
        )
    }
}

const mapDispatchToProps = {
    authenticateUser
}

const mapStateToProps = (state) => ({
    authenticated: state.session.authenticated
});

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(AuthenticationContainer)
);