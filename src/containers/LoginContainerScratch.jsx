import React, { Component } from 'react';
import Button from '../components/atomic/Button';
import Input from '../components/atomic/Input';

class LoginContainerScratch extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            mode: 'login',
            password: ''
        }
    }
    render() {
        return (
            <div className="login container">
                <h1>{this.state.mode === 'login' ? 'Login' : 'Sign up'}</h1>
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
                >
                    {this.state.mode === 'login' ? 'Login' : 'Sign up'}
                </Button>
                {this.state.mode === 'login' ? (
                    <p>Don't have an account? <span className="faux-link" onClick={this.toggleMode}>Sign up!</span></p>
                ) : (
                        <p>Already have an account? <span className="faux-link" onClick={this.toggleMode}>Login!</span></p>
                    )}
            </div>
        )
    }

    handleInput = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    toggleMode = () => {
        this.setState(prevState => ({
            mode: prevState.mode === 'login' ? 'sign-up' : 'login'
        }));
    }
}

export default LoginContainerScratch;