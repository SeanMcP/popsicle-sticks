import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Icon from '../components/atomic/Icon';
import SectionRow from '../components/student/SectionRow';
import WithHeroLayout from '../components/layout/WithHeroLayout';
import {
    getSections,
    getStudent,
    removeStudentFromSection,
    setModal,
    updateStudentLevel
} from '../actions';

class StudentContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }
    componentDidMount() {
        this.props.getSections();
        this.props.getStudent(this.props.match.params.studentId);
    }

    render() {
        return (
            <WithHeroLayout
                button={<Icon handleClick={this.openSettings} icon="fas fa-cog fa-lg" />}
                heading={`${this.props.student.name} ${this.props.student.gender === 'female' ? '♀' : '♂'}`}
            >
                <div className="student-container container">
                    <Link to="/">Back</Link>
                    {this.renderLevels()}
                </div>
            </WithHeroLayout>
        );
    }

    openSettings = () => {
        return this.props.setModal(
            'StudentSettings', {
                id: this.props.match.params.studentId,
                name: this.props.student.name,
                gender: this.props.student.gender
            }
        );
    }

    removeStudent = (sectionId) => {
        return this.props.removeStudentFromSection(this.props.match.params.studentId, sectionId);
    }

    renderLevels = () => {
        const { sections } = this.props.student;
        const levelList = [];
        for (const sectionId in sections) {
            const section = this.props.sections[sectionId];
            if (section && sections[sectionId]) {
                levelList.push(
                    <SectionRow
                        handleChange={this.updateStudentLevel}
                        handleRemove={this.removeStudent}
                        id={sectionId}
                        key={sectionId}
                        level={sections[sectionId]}
                        name={section.name}
                    />
                );
            }
        }
        if (levelList.length) {
            return <ul>{levelList}</ul>
        }
        return <div>This student doesn't have any sections.</div>
    }

    updateStudentLevel = (sectionId, newLevel) => {
        return this.props.updateStudentLevel(this.props.match.params.studentId, sectionId, newLevel);
    }
}

const mapStateToProps = (state) => {
    return {
        sections: state.sections.list,
        student: state.students.student
    };
};

const mapDispatchToProps = {
    getSections,
    getStudent,
    removeStudentFromSection,
    setModal,
    updateStudentLevel
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentContainer);