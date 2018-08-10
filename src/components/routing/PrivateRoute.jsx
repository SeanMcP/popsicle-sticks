import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { PATH } from '../../constants';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const isAuthenticated = localStorage.getItem('userAuth');
    return (
        <Route {...rest} render={
            (props) => {
                return (
                    isAuthenticated
                        ? (
                            <Component
                                {...props}
                                authenticated={rest.authenticated}
                                user={rest.user}
                            />
                        )
                        : <Redirect to={PATH.login} />
                );
            }
        } />
    );
}

const mapStateToProps = (state) => ({
    authenticated: state.session.authenticated,
    user: state.session.user,
});

PrivateRoute.propTypes = {
    authenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}

export default connect(mapStateToProps)(PrivateRoute);