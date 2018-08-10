import React from 'react';
import PropTypes from 'prop-types';
import Header from './layout/Header';
import Modal from './common/Modal';
import Toast from './common/Toast';
import withAuth from './hoc/withAuth';

const App = (props) => (
    <div className="app-container">
        <Header/>
        {props.children}
        <Modal/>
        <Toast/>
    </div>
);

App.propTypes = {
    authenticated: PropTypes.bool.isRequired,
}

export default withAuth(App);
