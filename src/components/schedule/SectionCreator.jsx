import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Select from '../atomic/Select';
import { addSection } from '../../actions';

class SectionCreator extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            level: '',
            type: ''
        };
    }

    render() {
        return (
            <div className="section-creator">
                <h2>Create a new section</h2>
                <form onSubmit={this.handleCreate}>
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
                        label="Level"
                        name="level"
                        options={['elementary', 'middle', 'secondary']}
                        value={this.state.level}
                    />
                    <Select
                        handleChange={this.handleChange}
                        label="Type"
                        name="type"
                        options={['math', 'science', 'social studies', 'reading', 'writing', 'general'].sort()}
                        value={this.state.type}
                    />
                    <button disabled={!this.state.name && !this.state.type}>
                        Create
                    </button>
                    <div onClick={this.props.handleClose}>
                        Cancel
                    </div>
                </form>
            </div>
        )
    }

    handleCreate = e => {
        e.preventDefault();
        const { name, level } = this.state;
        this.props.addSection(name, level, 'Lorem ipsum');
        // TODO: Only clear on success
        return this.setState({ name: '', level: null }, this.props.handleClose);
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