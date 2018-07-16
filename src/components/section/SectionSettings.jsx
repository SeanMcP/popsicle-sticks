import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '../atomic/Button';
import Input from '../atomic/Input';
import Select from '../atomic/Select';
import { updateSection } from '../../actions';

class SectionSettings extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: this.props.name,
            type: this.props.type
        }
    }

    render() {
        return (
            <div className="section-settings creator">
                <h2>Section settings</h2>
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
                    handleClick={this.handleSave}
                    disabled={(this.props.type === this.state.type && this.state.name === this.props.name) || !(this.state.name && this.state.type)}
                >
                    Save
                </Button>
                <Button
                    className="secondary full"
                    handleClick={this.props.handleClose}
                >
                    Cancel
                </Button>
            </div>
        );
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSave = () => {
        const { name, type } = this.state;
        this.props.updateSection(this.props.id, name, type);
        return this.props.handleClose();
    }
}

const mapDispatchToProps = {
    updateSection
}

SectionSettings.propTypes = {
    handleClose: PropTypes.func,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
}

export default connect(null, mapDispatchToProps)(SectionSettings);