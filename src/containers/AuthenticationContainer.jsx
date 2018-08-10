import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import withAuth from '../components/hoc/withAuth';
import { PATH } from '../constants';

class AuthenticationContainer extends Component {
    componentDidUpdate() {
        if (this.props.authenticated)
            this.props.history.push(PATH.schedule)
    }

    render() {
        return (
            <div className="authentication container">
                <div className="loading" />
                Loading
            </div>
        )
    }
}

AuthenticationContainer.propTypes = {
    authenticated: PropTypes.bool.isRequired,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    })
}

export default withAuth(
    withRouter(AuthenticationContainer)
);