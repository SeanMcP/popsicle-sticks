import React from 'react';
import { connect } from 'react-redux';
import { clearModal } from '../../actions';

const Modal = (props) => {
    if (!props.content) {
        return null;
    }
    const renderProps = {
        close: props.clearModal
    };
    return (
        <div className="modal">
            <div className="overlay" onClick={props.clearModal} />
            <div className="content">
                {typeof props.content === 'function'
                    ? props.content(renderProps)
                    : props.content}
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        content: state.notifications.modal
    }
}

const mapDispatchToProps = {
    clearModal
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal);