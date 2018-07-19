import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '../atomic/Button';
import Input from '../atomic/Input';
import SelectType from '../common/SelectType';
import { deleteSection, updateSection } from '../../actions';

class SectionSettings extends Component {
    constructor(props) {
        super(props);

        this.state = {
            displayDelete: false,
            name: this.props.name,
            type: this.props.type
        }
    }

    render() {
        const { displayDelete } = this.state;
        return (
            <div className="settings creator">
                <h2>Section info</h2>
                <Input
                    handleChange={this.handleChange}
                    label="Name"
                    name="name"
                    value={this.state.name}
                />
                <SelectType
                    handleChange={this.handleChange}
                    label="Type"
                    value={this.state.type}
                />
                <div className="delete-section" style={{ gridTemplateColumns: displayDelete ? '1fr 1fr' : '1fr' }}>
                    {displayDelete ? (
                        <Button
                            className="danger full"
                            icon="fas fa-exclamation-triangle"
                            handleClick={this.handleDelete}
                        >
                            Delete forever
                        </Button>
                    ) : null }
                    <Button className="full" handleClick={this.toggleDisplayDelete}>
                        {displayDelete ? 'Cancel' : 'Delete'}
                    </Button>
                </div>
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

    handleDelete = () => {
        this.props.deleteSection(this.props.id)
        return this.props.handleClose();
    }

    handleSave = () => {
        const { name, type } = this.state;
        this.props.updateSection(this.props.id, name, type);
        return this.props.handleClose();
    }

    toggleDisplayDelete = () => {
        return this.setState(prevState => ({ displayDelete: !prevState.displayDelete }));
    }
}

const mapDispatchToProps = {
    deleteSection,
    updateSection
}

SectionSettings.propTypes = {
    handleClose: PropTypes.func,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
}

export default connect(null, mapDispatchToProps)(SectionSettings);