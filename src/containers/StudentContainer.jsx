import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    getSections,
    getStudent
} from '../actions';

class StudentContainer extends Component {
    componentDidMount() {
        this.props.getSections();
        this.props.getStudent(this.props.match.params.studentId);
    }
    render() {
        const { studentId } = this.props.match.params;
        return (
            <div className="student-container">
                <Link to="/">Back</Link>
                <br />
                <h1>Student</h1>
                Student Id: {studentId}
                <br />
                <h2>{this.props.student.name}</h2>
                <p>{this.props.student.gender}</p>
                {this.renderLevels()}
            </div>
        );
    }

    renderLevels = () => {
        const { sections } = this.props.student;
        const levelList = [];
        for (const sectionId in sections) {
            const section = this.props.sections[sectionId];
            if (section) {
                levelList.push(
                    <li key={sectionId}>
                        <Link to={`/section/${sectionId}`}>{section.name}</Link> - {section.type} - {sections[sectionId]}
                    </li>
                );
            }
        }
        return <ul>{levelList}</ul>
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
    getStudent
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentContainer);