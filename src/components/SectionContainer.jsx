import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../firebase';

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
            </div>
        );
    }

    handleCreate = e => {
        e.preventDefault();
        const studentsRef = firebase.database().ref('students');
        const student = {
            name: this.state.name,
            gender: this.state.gender,
            currentLevel: this.state.currentLevel,
            highlighted: this.state.highlighted,
            sectionId: this.props.match.params.sectionId
        };
        studentsRef.push(student);
        this.setState({ name: '', gender: null });
    };

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };
}

export default SectionContainer;