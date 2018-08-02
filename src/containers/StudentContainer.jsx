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
                heading={this.renderTitle()}
            >
                <div className="student-container container">
                    <Link to="/">Back</Link>
                    {this.renderLevels()}
                </div>
            </WithHeroLayout>
        );
    }

    openSettings = () => {
        return this.props.setModal({
            name: 'StudentSettings',
            props: {
                id: this.props.match.params.studentId,
                name: this.props.student.name,
                gender: this.props.student.gender
            }
        });
    }

    removeStudent = (sectionId) => {
        return this.props.removeStudentFromSection(this.props.match.params.studentId, sectionId);
    }

    renderLevels = () => {
        if (this.props.student) {
            const { sections } = this.props.student;
            const levelList = [];
            for (const sectionId in sections) {
                const section = this.props.sections[sectionId];
                if (section && sections[sectionId] && sections[sectionId].current_level) {
                    levelList.push(
                        <SectionRow
                            handleChange={this.updateStudentLevel}
                            handleRemove={this.removeStudent}
                            highlight={sections[sectionId].highlight}
                            id={sectionId}
                            key={sectionId}
                            level={sections[sectionId].current_level}
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
    }

    renderTitle = () => {
        const { student } = this.props;
        if (student && student.name && student.gender) {
            return `${student.name} ${student.gender === 'female' ? '♀' : '♂'}`;
        }
        return '';
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