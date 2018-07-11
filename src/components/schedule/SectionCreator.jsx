import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '../atomic/Button';
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
            <div className="section-creator">
                <h2>Create a new section</h2>
                <form>
                    <label htmlFor="name">Name</label>
                    <input
                        id="name"
                        name="name"
                        onChange={this.handleChange}
                        type="text"
                        value={this.state.name}
                    />
                    <Select
                        handleChange={this.handleChange}
                        label="Type"
                        name="type"
                        options={['math', 'science', 'social studies', 'language arts', 'general'].sort()}
                        value={this.state.type}
                    />
                    <Button
                        className="full"
                        handleClick={this.handleCreate}
                        disabled={!(this.state.name && this.state.level && this.state.type)}
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
        // TODO: Only clear on success
        return this.setState({ name: '', type: '' }, this.props.handleClose);
    };

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
}

const mapDispatchToProps = {
    addSection,
}

SectionCreator.propTypes = {
    handleClose: PropTypes.func.isRequired
}

export default connect(null, mapDispatchToProps)(SectionCreator);