import React from 'react';
import { connect } from 'react-redux';
import Header from './layout/Header';
import Modal from './common/Modal';

const App = ({ children }) => (
    <div className="app-container">
        <Header/>
        {children}
        <Modal/>
    </div>
);

const mapStateToProps = (state) => {
    return {
        message: state.notifications.message,
        modal: state.notifications.modal,
        type: state.notifications.type
    }
}

export default connect(mapStateToProps)(App);
