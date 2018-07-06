import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SelectGender from '../components/common/SelectGender';
import SelectLevel from '../components/common/SelectLevel';
import StudentAttendance from '../components/section/StudentAttendance';
import StudentRow from '../components/section/StudentRow';
import {
    addStudent,
    getStudentsBySection,
    updateStudentLevel
} from '../actions';

class SectionContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            gender: '',
            level: '',
            name: '',
            mode: 'none'
        };
    }

    componentDidMount() {
        this.props.getStudentsBySection(this.props.match.params.sectionId);
    }

    render() {
        const { sectionId } = this.props.match.params;
        return (
            <div className="class-container">
                <Link to="/">Back</Link>
                <br />
                <h1>Class</h1>
                Section Id: {sectionId}
                <br />
                <div className="tools">
                    <div
                        onClick={() => this.setMode('random')}
                    >
                        Random Student Picker
                    </div>
                    <div
                        onClick={() => this.setMode('group')}
                    >
                        Group Maker
                    </div>
                </div>
                {this.state.mode !== 'none' ? (
                    <StudentAttendance
                        cancel={() => this.setMode('none')}
                        mode={this.state.mode}
                        section={this.props.match.params.sectionId}
                    />
                ) : null}
                <div className="create">
                    <form onSubmit={this.handleCreate}>
                        <input name="name" onChange={this.handleChange} placeholder="Name" type="text" value={this.state.name} />
                        <SelectGender
                            handleChange={this.handleChange}
                            label="Gender:"
                            value={this.state.gender}
                        />
                        <SelectLevel
                            handleChange={this.handleChange}
                            label="Current level:"
                            value={this.state.level}
                        />
                        <button>Create</button>
                    </form>
                </div>
                {this.renderStudents()}
            </div>
        );
    }

    handleCreate = e => {
        e.preventDefault();
        const { gender, level, name } = this.state;
        
        if (gender && level && name) {
            this.props.addStudent(name, gender, this.props.match.params.sectionId, level);
            this.setState({
                gender: '',
                level: '',
                name: ''
            });
        }
    };

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    renderStudents = () => {
        const { students } = this.props;
        const { sectionId } = this.props.match.params;
        const rows = [];
        for (const id in students) {
            const student = students[id];
            rows.push(
                <StudentRow
                    gender={student.gender}
                    handleChange={this.updateStudentLevel}
                    id={id}
                    key={id}
                    level={student.sections[sectionId]}
                    name={student.name}
                />
            );
        }
        return <table><tbody>{rows}</tbody></table>;
    }

    setMode = (mode) => {
        this.setState({ mode });
    }

    updateStudentLevel = (studentId, newLevel) => {
        return this.props.updateStudentLevel(studentId, this.props.match.params.sectionId, newLevel);
    }
}

const mapStateToProps = (state) => {
    return {
        students: state.students.list
    };
};

const mapDispatchToProps = {
    addStudent,
    getStudentsBySection,
    updateStudentLevel
};

export default connect(mapStateToProps, mapDispatchToProps)(SectionContainer);