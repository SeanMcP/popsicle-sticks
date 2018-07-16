import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '../atomic/Button';
import Input from '../atomic/Input';
import Select from '../atomic/Select';
import { addSection } from '../../actions';

class SectionCreator extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            type: ''
        };
    }

    render() {
        return (
            <div className="section-creator creator">
                <h2>Create a new section</h2>
                <form>
                    <Input
                        handleChange={this.handleChange}
                        label="Name"
                        name="name"
                        value={this.state.name}
                    />
                    <Select
                        handleChange={this.handleChange}
                        label="Type"
                        name="type"
                        options={['math', 'science', 'social studies', 'language arts', 'general education'].sort()}
                        value={this.state.type}
                    />
                    <Button
                        className="full"
                        handleClick={this.handleCreate}
                        disabled={!(this.state.name && this.state.type)}
                    >
                        Create
                    </Button>
                    <Button
                        className="secondary full"
                        handleClick={this.props.handleClose}
                    >
                        Cancel
                    </Button>
                </form>
            </div>
        )
    }

    handleCreate = e => {
        e.preventDefault();
        const { name, type } = this.state;
        this.props.addSection(name, type);
        return this.props.handleClose();
    };

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
}

const mapDispatchToProps = {
    addSection
}

SectionCreator.propTypes = {
    handleClose: PropTypes.func
}

export default connect(null, mapDispatchToProps)(SectionCreator);