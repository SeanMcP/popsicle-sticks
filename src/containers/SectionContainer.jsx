import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '../components/atomic/Button';
import StudentCreator from '../components/section/StudentCreator';
import StudentAttendance from '../components/section/StudentAttendance';
import StudentRow from '../components/section/StudentRow';
import {
    addStudent,
    getStudentsBySection,
    setModal,
    updateStudentLevel
} from '../actions';

class SectionContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            mode: 'none'
        };
    }

    componentDidMount() {
        this.props.getStudentsBySection(this.props.match.params.sectionId);
    }

    render() {
        const { sectionId } = this.props.match.params;
        return (
            <div className="section container">
                <Link to="/">Back</Link>
                <br />
                <h1>Class</h1>
                Section Id: {sectionId}
                <br />
                <div className="tools">
                    <Button handleClick={() => this.setMode('random')}>
                        Random Student Picker
                    </Button>
                    <Button handleClick={() => this.setMode('group')}>
                        Group Maker
                    </Button>
                </div>
                <Button
                    handleClick={this.openCreator}
                    icon="fas fa-plus"
                >
                    Add student
                </Button>
                {this.state.mode !== 'none' ? (
                    <StudentAttendance
                        cancel={() => this.setMode('none')}
                        mode={this.state.mode}
                        section={this.props.match.params.sectionId}
                    />
                ) : null}
                {this.renderStudents()}
            </div>
        );
    }

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
        return <div className="student-list">{rows}</div>;
    }

    openCreator = () => {
        return this.props.setModal((renderProps) =>
            <StudentCreator
                handleClose={renderProps.close}
                section={this.props.match.params.sectionId}
            />
        );
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
}

const mapDispatchToProps = {
    addStudent,
    getStudentsBySection,
    setModal,
    updateStudentLevel
}

export default connect(mapStateToProps, mapDispatchToProps)(SectionContainer);