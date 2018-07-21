import React, { Component } from 'react';
import { connect } from 'react-redux';
import Icon from '../atomic/Icon';
import { clearNotification } from '../../actions';

class Toast extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isClosing: false
        }
    }

    // componentDidUpdate() {
    //     if (!this.props.message) {
    //         return this.setState({ isClosing: false });
    //     }
    //     setTimeout(
    //         () => this.setState({ isClosing: true }),
    //         this.props.message.length * 100 - 200
    //     )
    // }

    render() {
        const { message, type } = this.props;

        if (!message || !type) {
            return null;
        }

        return (
            <div className={`toast type-${type} ${this.state.isClosing ? 'closing' : ''}`}>
                <Icon icon={`fas fa-${this.generateIcon()}-circle fa-2x`} />
                <div className="message">{message}</div>
            </div>
        );
    }

    generateIcon = () => {
        switch (this.props.type) {
            case 'SUCCESS':
                return 'check';
            case 'FAILURE':
                return 'exclamation';
            default:
                return 'dot';
        }
    }
}

const mapStateToProps = (state) => {
    return {
        message: state.notifications.notificationMessage,
        type: state.notifications.notificationType
    }
}

const mapDispatchToProps = {
    clearNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(Toast);