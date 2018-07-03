import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    addStudent,
    getStudentsBySection
} from '../actions';

class SectionContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentLevel: 'proficient',
            gender: null,
            highlighted: false,
            name: '',
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
                Id: {sectionId}
                <br />
                <div className="create">
                    <form onSubmit={this.handleCreate}>
                        <input
                            name="name"
                            onChange={this.handleChange}
                            placeholder="Name"
                            type="text"
                            value={this.state.name}
                        />
                        <input
                            id="genderMale"
                            name="gender"
                            onChange={this.handleChange}
                            type="radio"
                            value="male"
                        />
                        <label htmlFor="genderMale">Male</label>
                        <input
                            id="genderFemale"
                            name="gender"
                            onChange={this.handleChange}
                            type="radio"
                            value="female"
                        />
                        <label htmlFor="genderFemale">Female</label>
                        <button>Create</button>
                    </form>
                </div>
                <ul>
                    {this.renderStudents()}
                </ul>
            </div>
        );
    }

    handleCreate = e => {
        e.preventDefault();
        // const studentsRef = firebase.database().ref('students');
        // const student = {
        //     name: this.state.name,
        //     gender: this.state.gender,
        //     currentLevel: this.state.currentLevel,
        //     highlighted: this.state.highlighted,
        //     sectionId: this.props.match.params.sectionId
        // };
        // studentsRef.push(student);
        this.setState({ name: '', gender: null });
    };

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    renderStudents = () => {
        const { students } = this.props;
        const { sectionId } = this.props.match.params;
        const output = [];
        for (const id in students) {
            const student = students[id];
            output.push(
                <li key={id}>{student.name} - {student.gender} - {student.sections[sectionId]}</li>
            );
        }
        return output;
    }
}

const mapStateToProps = (state) => {
    return {
        students: state.students.list
    };
};

const mapDispatchToProps = {
    addStudent,
    getStudentsBySection
};

export default connect(mapStateToProps, mapDispatchToProps)(SectionContainer);