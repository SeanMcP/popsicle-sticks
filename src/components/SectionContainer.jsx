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
            gender: '',
            level: '',
            name: ''
        };
    }

    componentDidMount() {
        this.props.getStudentsBySection(this.props.match.params.sectionId);
    }

    render() {
        const { sectionId } = this.props.match.params;
        return <div className="class-container">
                <Link to="/">Back</Link>
                <br />
                <h1>Class</h1>
                Section Id: {sectionId}
                <br />
                <div className="create">
                    <form onSubmit={this.handleCreate}>
                        <input name="name" onChange={this.handleChange} placeholder="Name" type="text" value={this.state.name} />
                        <label htmlFor="gender">Gender:</label>
                        <select id="gender" name="gender" onChange={this.handleChange}>
                            <option value="">Select one</option>
                            <option value="female">Female</option>
                            <option value="male">Male</option>
                        </select>
                        <label htmlFor="level">Current level:</label>
                        <select id="level" name="level" onChange={this.handleChange}>
                            <option value="">Select one</option>
                            <option value="advanced">Advanced</option>
                            <option value="proficient">Proficient</option>
                            <option value="basic">Basic</option>
                        </select>
                        <button>Create</button>
                    </form>
                </div>
                <ul>{this.renderStudents()}</ul>
            </div>;
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
        const output = [];
        for (const id in students) {
            const student = students[id];
            output.push(
                <li key={id}>{student.name} - {student.gender} - {student.sections[sectionId]} - <Link to={`/student/${id}`}>Edit</Link></li>
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