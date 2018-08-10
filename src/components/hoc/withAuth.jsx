import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { authenticateUser } from '../../actions';

const withAuth = (ChildComponent) => {
    class withAuth extends Component {
        componentDidMount() {
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    // User is signed in.
                    const userData = {
                        displayName: user.displayName,
                        email: user.email,
                        uid: user.uid,
                    }

                    this.props.authenticateUser(userData);
                }
            }, (error) => {
                console.log(error);
            });
        }
        render() {
            const { authenticated, authenticateUser, user, ...rest } = this.props;
            return (
                <ChildComponent
                    authenticated={authenticated}
                    user={user}
                    {...rest}
                />
            );
        }
    }

    const mapStateToProps = (state) => ({
        authenticated: state.session.authenticated,
        user: state.session.user
    });

    const mapDispatchToProps = {
        authenticateUser
    }

    return connect(mapStateToProps, mapDispatchToProps)(withAuth);
}

export default withAuth;