import React from 'react';
import { connect } from 'react-redux';
import ModalContent from '../modal';
import { clearModal } from '../../actions';

const Modal = (props) => {
    if (!props.modalName) {
        return null;
    }
    const Content = ModalContent[props.modalName];
    return (
        <div className="modal">
            <div className="overlay" onClick={props.clearModal} />
            <div className="content">
                <Content {...props.modalProps} handleClose={props.clearModal}/>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        modalName: state.notifications.modalName,
        modalProps: state.notifications.modalProps,
    }
}

const mapDispatchToProps = {
    clearModal
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal);