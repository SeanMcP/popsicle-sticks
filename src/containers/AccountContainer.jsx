import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import WithHeroLayout from '../components/layout/WithHeroLayout';
import { userPasswordUpdate } from '../actions';

class AccountContainer extends Component {
    render() {
        return (
            <WithHeroLayout
                heading="Account"
            >
                <div className="container account">
                </div>
            </WithHeroLayout>
        );
    }
}

const mapDispatchToProps = {
    userPasswordUpdate
}

AccountContainer.propTypes = {
    authenticated: PropTypes.bool.isRequired,
    user: PropTypes.shape({
        email: PropTypes.string.isRequired,
        uid: PropTypes.string.isRequired,
    }).isRequired,
    userPasswordUpdate: PropTypes.func.isRequired
}

export default connect(null, mapDispatchToProps)(AccountContainer);