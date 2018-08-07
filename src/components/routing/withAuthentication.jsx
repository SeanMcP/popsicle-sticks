import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { authenticateUser } from '../actions';

const withAuthentication = (Component) => {
    class withAuthentication extends Component {
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

        render() {
            return (
                <Component
                    authenticated={this.props.authenticated}
                    user={this.props.user}
                />
            );
        }
    }

    const mapStateToProps = (state) => ({
        authenticated: state.session.authenticated,
        user: state.session.user
    })

    const mapDispatchToProps = {
        authenticateUser
    }

    return connect(mapStateToProps, mapDispatchToProps)(withAuthentication);
}

export default withAuthentication;