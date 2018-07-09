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
            level: null,
        };
    }

    render() {
        return (
            <div className="create-section-container">
                <form onSubmit={this.handleCreate}>
                    <label htmlFor="name">Section name:</label>
                    <input
                        id="name"
                        name="name"
                        onChange={this.handleChange}
                        type="text"
                        value={this.state.name}
                    />
                    <Select
                        handleChange={this.handleChange}
                        label="Section level: "
                        name="level"
                        options={['elementary', 'middle', 'secondary']}
                        value={this.state.level}
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