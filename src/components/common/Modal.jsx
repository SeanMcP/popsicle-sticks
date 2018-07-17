import React, { Component } from 'react';
import { connect } from 'react-redux';
import ModalContent from '../modal';
import { clearModal } from '../../actions';

class Modal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isClosing: false
        }
    }

    render() {
        const Content = ModalContent[this.props.modalName];

        if (!this.props.modalName || !Content) {
            return null;
        }

        return (
            <div className={`modal ${this.state.isClosing ? 'closing' : ''}`}>
                <div className="overlay" onClick={this.handleClose} />
                <div className="content">
                    <Content {...this.props.modalProps} handleClose={this.handleClose}/>
                </div>
            </div>
        );
    }

    handleClose = () => {
        this.setState({ isClosing: true });
        setTimeout(() => 
            this.setState({ isClosing: false }, this.props.clearModal)
        , 200);
    }
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