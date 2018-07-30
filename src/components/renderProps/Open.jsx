import React, { Component } from 'react';

class Open extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
        };
    }

    render() {
        const renderProps = {
            close,
            isOpen: this.state.isOpen,
            open,
            toggle
        }

        if (typeof this.props.children === 'function') {
            return this.props.children(renderProps);
        }

        return this.props.children;
    }

    close = () => {
        this.setState({ isOpen: false });
    }

    open = () => {
        this.setState({ isOpen: true });
    }

    toggle = () => {
        this.setState((prevState) => ({ isOpen: !prevState.isOpen }));
    }
}

export default Open;