import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SectionRow from '../components/SectionRow';
import SelectGender from '../components/common/SelectGender';
import SelectLevel from '../components/common/SelectLevel';
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
            name: '',
            mode: 'none'
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
                <ul>{this.renderStudents()}</ul>
                {this.state.mode === 'edit' ? (
                    <div>
                        Editing {this.state.student}
                        <div onClick={this.clearStudent}>Cancel</div>
                        <div onClick={this.clearStudent}>Save</div>
                    </div>
                ) : null}
            </div>;
    }

    clearStudent = () => {
        this.setState({ mode: 'none', student: '' });
    }

    editStudent = (id) => {
        this.setState({ mode: 'edit', student: id });
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
                <SectionRow
                    disabled={id !== this.state.student}
                    editStudent={this.editStudent}
                    gender={student.gender}
                    id={id}
                    key={id}
                    level={student.sections[sectionId]}
                    name={student.name}
                />
            );
        }
        return output;
    }

    setMode = (mode) => {
        this.setState({ mode });
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