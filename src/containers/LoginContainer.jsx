import React, { Component } from 'react';
import { ui, uiConfig } from '../firebase';

class LoginContainer extends Component {
    componentDidMount() {
        ui.start('#firebaseui-auth-container', uiConfig);
    }
    render() {
        return (
            <div id="firebaseui-auth-container" />
        )
    }
}

export default LoginContainer;