import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '../atomic/Button';
import Input from '../atomic/Input';
import SelectGender from '../common/SelectGender';
import { deleteStudent, updateStudentInfo } from '../../actions';

class StudentSettings extends Component {
    constructor(props) {
        super(props);

        this.state = {
            displayDelete: false,
            name: this.props.name,
            gender: this.props.gender
        }
    }

    render() {
        const { displayDelete } = this.state;
        return (
            <div className="settings creator">
                <h2>Student info</h2>
                <Input
                    handleChange={this.handleChange}
                    label="Name"
                    name="name"
                    value={this.state.name}
                />
                <SelectGender
                    handleChange={this.handleChange}
                    label="Gender"
                    value={this.state.gender}
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
                    ) : null}
                    <Button className="full" handleClick={this.toggleDisplayDelete}>
                        {displayDelete ? 'Cancel' : 'Delete'}
                    </Button>
                </div>
                <Button
                    className="full"
                    handleClick={this.handleSave}
                    disabled={(this.props.gender === this.state.gender && this.state.name === this.props.name) || !(this.state.name && this.state.gender)}
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
        this.props.deleteStudent(this.props.id)
        return this.props.handleClose();
    }

    handleSave = () => {
        const { name, gender } = this.state;
        this.props.updateStudentInfo(this.props.id, name, gender);
        return this.props.handleClose();
    }

    toggleDisplayDelete = () => {
        return this.setState(prevState => ({ displayDelete: !prevState.displayDelete }));
    }
}

const mapDispatchToProps = {
    deleteStudent,
    updateStudentInfo
}

StudentSettings.propTypes = {
    handleClose: PropTypes.func,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired,
}

export default connect(null, mapDispatchToProps)(StudentSettings);