import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Button from '../components/atomic/Button';
import Input from '../components/atomic/Input';
import {
    userCreateWithEmailAndPassword
} from '../actions';
import { PATH } from '../constants';

class SignupContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            confirmation: '',
            email: '',
            password: ''
        }
    }

    render() {
        return (
            <div className="signup container">
                <h1>Sign up</h1>
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
                <Input
                    handleChange={this.handleInput}
                    label="Confirm password"
                    name="confirmation"
                    type="password"
                />
                <Button
                    className="full"
                    disabled={!(this.state.email && this.state.password && this.state.password === this.state.confirmation)}
                    handleClick={this.handleCreate}
                >
                    Sign up
                </Button>
                <p>Already have an account? <Link to={PATH.login}>Login!</Link></p>
            </div>
        )
    }

    handleCreate = () => {
        this.props.userCreateWithEmailAndPassword(
            this.state.email,
            this.state.password
        );
    }

    handleInput = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
}

const mapDispatchToProps = {
    userCreateWithEmailAndPassword
}

export default connect(null, mapDispatchToProps)(SignupContainer);