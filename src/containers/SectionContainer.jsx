import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '../components/atomic/Button';
import Icon from '../components/atomic/Icon';
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
                className={this.getTypeClass()}
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
    
    getTypeClass = () => {
        const { info } = this.props;
        if (info && info.type) {
            return `type-${info.type.replace(/ /g, '_')}`;
        }
        return 'type-default';
    }
    
    openAttendance = (mode) => {
        return () => this.props.setModal({
            name: 'StudentAttendance',
            props: {
                mode,
                section: this.props.match.params.sectionId,
                students: this.props.students
            }
        });
    }

    openCreator = () => {
        return this.props.setModal({
            name: 'StudentCreator',
            props: { section: this.props.match.params.sectionId }
        });
    }

    openSettings = () => {
        return this.props.setModal({
            name: 'SectionSettings',
            props: {
                id: this.props.match.params.sectionId,
                name: this.props.info.name,
                type: this.props.info.type
            }
        });
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