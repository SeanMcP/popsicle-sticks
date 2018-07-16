import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '../components/atomic/Button';
import Icon from '../components/atomic/Icon';
import SectionSettings from '../components/section/SectionSettings';
import StudentAttendance from '../components/section/StudentAttendance';
import StudentCreator from '../components/section/StudentCreator';
import StudentRow from '../components/section/StudentRow';
import WithHeroLayout from '../components/layout/WithHeroLayout';
import {
    addStudent,
    getSections,
    getStudentsBySection,
    removeStudentFromSection,
    setModal,
    updateStudentLevel
} from '../actions';
import { ObjVal } from '../utils';

class SectionContainer extends Component {

    componentDidMount() {
        this.props.getStudentsBySection(this.props.match.params.sectionId);
        if (!ObjVal(this.props.info)) {
            this.props.getSections();
        }
    }

    render() {
        return (
            <WithHeroLayout
                button={<Icon handleClick={this.openSettings} icon="fas fa-cog fa-lg" />}
                heading={this.renderTitle()}
            >
                <div className="section container">
                    <Link to="/">Back</Link>
                    <div className="tools">
                        <Button handleClick={this.openAttendance('random')}>
                            Random Student Picker
                        </Button>
                        <Button handleClick={this.openAttendance('group')}>
                            Group Maker
                        </Button>
                    </div>
                    <Button
                        handleClick={this.openCreator}
                        icon="fas fa-plus"
                    >
                        Add student
                    </Button>
                    {this.renderStudents()}
                </div>
            </WithHeroLayout>
        );
    }
    
    openAttendance = (mode) => {
        return () => this.props.setModal((renderProps) =>
            <StudentAttendance
                handleClose={renderProps.close}
                mode={mode}
                section={this.props.match.params.sectionId}
                students={this.props.students}
            />
        );
    }

    openCreator = () => {
        return this.props.setModal((renderProps) =>
            <StudentCreator
                handleClose={renderProps.close}
                section={this.props.match.params.sectionId}
            />
        );
    }

    openSettings = () => {
        return this.props.setModal((renderProps) =>
            <SectionSettings
                handleClose={renderProps.close}
                id={this.props.match.params.sectionId}
                name={this.props.info.name}
                type={this.props.info.type}
            />
        );
    }

    removeStudent = (studentId) => {
        return this.props.removeStudentFromSection(studentId, this.props.match.params.sectionId);
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
                    handleRemove={this.removeStudent}
                    id={id}
                    key={id}
                    level={student.sections[sectionId]}
                    name={student.name}
                />
            );
        }
        return <div className="student-list">{rows}</div>;
    }

    renderTitle = () => {
        if (this.props.info && this.props.info.name) {
            return this.props.info.name;
        }
    }

    updateStudentLevel = (studentId, newLevel) => {
        return this.props.updateStudentLevel(studentId, this.props.match.params.sectionId, newLevel);
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        info: state.sections.list[ownProps.match.params.sectionId],
        students: state.students.list
    };
}

const mapDispatchToProps = {
    addStudent,
    getSections,
    getStudentsBySection,
    removeStudentFromSection,
    setModal,
    updateStudentLevel
}

export default connect(mapStateToProps, mapDispatchToProps)(SectionContainer);