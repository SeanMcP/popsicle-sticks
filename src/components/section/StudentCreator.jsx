import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '../atomic/Button';
import Input from '../atomic/Input';
import SelectGender from '../common/SelectGender';
import SelectLevel from '../common/SelectLevel';
import { addStudent } from '../../actions';

class StudentCreator extends Component {
    constructor(props) {
        super(props);

        this.state = {
            gender: '',
            level: '',
            name: ''
        };
    }

    render() {
        return (
            <div className="student-creator creator">
                <h2>Add a student</h2>
                <form>
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
                    <SelectLevel
                        handleChange={this.handleChange}
                        label="Current level"
                        value={this.state.level}
                    />
                    <Button
                        className="full"
                        handleClick={this.handleCreate}
                        disabled={!(this.state.name && this.state.level && this.state.gender)}
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
        const { gender, level, name } = this.state;

        if (gender && level && name) {
            this.props.addStudent(name, gender, this.props.section, level);
            this.setState({
                gender: '',
                level: '',
                name: ''
            }, this.props.handleClose);
        }
    };

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
}

const mapDispatchToProps = {
    addStudent
}

StudentCreator.propTypes = {
    handleClose: PropTypes.func,
    section: PropTypes.string.isRequired
}

export default connect(null, mapDispatchToProps)(StudentCreator);