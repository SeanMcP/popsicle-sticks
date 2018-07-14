import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '../atomic/Button';
import Input from '../atomic/Input';
import Select from '../atomic/Select';
import SelectGender from '../common/SelectGender';
import SelectLevel from '../common/SelectLevel';
import {
    addExistingStudent,
    addStudent,
    getAllStudents
} from '../../actions';

class StudentCreator extends Component {
    constructor(props) {
        super(props);

        this.state = {
            gender: '',
            level: '',
            newStudent: true,
            name: ''
        };
    }

    componentDidMount() {
        this.props.getAllStudents();
    }

    render() {
        const { newStudent } = this.state;
        return (
            <div className="student-creator creator">
                <h2>Add a student</h2>
                <form>
                    <div className="mode-toggle">
                        <span className="faux-link" onClick={this.toggleMode}>
                            {newStudent ? 'Add student from another section' : 'Add new student'}?
                        </span>
                    </div>
                    {newStudent ? (
                        <Input
                            handleChange={this.handleChange}
                            label="Name"
                            name="name"
                            value={this.state.name}
                        />
                    ) : (
                        <Select
                            handleChange={this.handleChange}
                            label="Name"
                            name="name"
                            options={this.generateOptions()}
                            value={this.state.name}
                        />
                    )}
                    {newStudent ? (
                        <SelectGender
                            handleChange={this.handleChange}
                            label="Gender"
                            value={this.state.gender}
                        />
                    ) : null}
                    <SelectLevel
                        handleChange={this.handleChange}
                        label="Current level"
                        value={this.state.level}
                    />
                    <Button
                        className="full"
                        handleClick={this.handleCreate}
                        disabled={this.disableCreate()}
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

    disableCreate = () => {
        const { gender, isNew, level, name } = this.state;
        if (isNew) {
            return !(gender && level && name);
        } else {
            return !(level && name);
        }
    }

    generateOptions = () => {
        const all = {...this.props.allStudents};
        for (const id in all) {
            if (this.props.sectionStudents.hasOwnProperty(id)) {
                delete all[id];
            }
        }
        return Object.keys(all).map(id => all[id].name).sort();
    }

    handleCreate = e => {
        e.preventDefault();
        const { gender, isNew, level, name } = this.state;

        if (isNew) {
            if (gender && level && name) {
                this.props.addStudent(name, gender, this.props.section, level);
                this.setState({
                    gender: '',
                    level: '',
                    name: ''
                }, this.props.handleClose);
            }
        } else {
            if (level && name) {
                let studentId;
                for (const id in this.props.allStudents) {
                    if (this.props.allStudents[id].name === name) {
                        studentId = id;
                    }
                }
                if (studentId) {
                    this.props.addExistingStudent(studentId, this.props.section, level)
                    this.setState({
                        gender: '',
                        level: '',
                        name: ''
                    }, this.props.handleClose);
                }
            }
        }

    };

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    toggleMode = () => {
        return this.setState((prevState) => ({ newStudent: !prevState.newStudent }))
    }
}

const mapStateToProps = (state) => {
    return {
        allStudents: state.students.all,
        sectionStudents: state.students.list
    };
}

const mapDispatchToProps = {
    addExistingStudent,
    addStudent,
    getAllStudents
}

StudentCreator.propTypes = {
    handleClose: PropTypes.func,
    section: PropTypes.string.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentCreator);