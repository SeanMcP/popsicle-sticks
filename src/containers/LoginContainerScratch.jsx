import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '../components/atomic/Button';
import Input from '../components/atomic/Input';
import {
    userSignInWithEmailAndPassword
} from '../actions';
import { PATH } from '../constants';

class LoginContainerScratch extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        }
    }
    render() {
        return (
            <div className="login container">
                <h1>Login</h1>
                <Input
                    handleChange={this.handleInput}
                    label="Email address"
                    name="email"
                    type="email"
                />
                <Input
                    handleChange={this.handleInput}
                    label="Password"
                    name="password"
                    type="password"
                />
                <Button
                    className="full"
                    disabled={!(this.state.email && this.state.password)}
                    handleClick={this.handleLogin}
                >
                    Login
                </Button>
                <p>Need an account? <Link to={PATH.signup}>Sign up!</Link></p>
            </div>
        )
    }

    handleInput = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleLogin = () => {
        this.props.userSignInWithEmailAndPassword(
            this.state.email,
            this.state.password
        );
    }
}

const mapDispatchToProps = {
    userSignInWithEmailAndPassword
}

export default connect(null, mapDispatchToProps)(LoginContainerScratch);