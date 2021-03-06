import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import WithHeroLayout from '../components/layout/WithHeroLayout';
import { userPasswordUpdate } from '../actions';
import { PATH } from '../constants';

class AccountContainer extends Component {
    render() {
        return (
            <WithHeroLayout
                heading="Account"
            >
                <div className="container account">
                    <Link to={PATH.schedule}>Back</Link>
                    <h2>Details</h2>
                    <p><b>Email address:</b> {this.props.user.email}</p>
                </div>
            </WithHeroLayout>
        );
    }
}

const mapDispatchToProps = {
    userPasswordUpdate
}

const mapStateToProps = (state) => ({
    authenticated: state.session.authenticated,
    user: state.session.user
});

AccountContainer.propTypes = {
    authenticated: PropTypes.bool.isRequired,
    user: PropTypes.shape({
        email: PropTypes.string.isRequired,
        uid: PropTypes.string.isRequired,
    }).isRequired,
    userPasswordUpdate: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountContainer);