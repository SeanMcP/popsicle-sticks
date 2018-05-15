import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import firebase from '../firebase';
import { setSections } from '../actions/sectionActions';

class SectionListContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            type: null,
        };
    }

    componentDidMount() {
        const sectionRef = firebase.database().ref('sections');
        sectionRef.on('value', (snapshot) => {
            const sections = snapshot.val();
            const newState = [];
            for (const section in sections) {
                newState.push({
                    id: section,
                    name: sections[section].name,
                    type: sections[section].type
                });
            }
            this.props.setSections(newState);
        });
    }

    render() {
        return (
            <div className="section-list-container">
                Class list container
                <div className="create">
                    <form onSubmit={this.handleCreate}>
                        <input name="name" onChange={this.handleChange} placeholder="Section name" type="text" value={this.props.name} />
                        <input id="sectionTypeElementary" name="type" onChange={this.handleChange} type="radio" value="elementary" />
                        <label htmlFor="sectionTypeElementary">
                            Elementary
                        </label>
                        <input id="sectionTypeMiddle" name="type" onChange={this.handleChange} type="radio" value="middle" />
                        <label htmlFor="sectionTypeMiddle">
                            Middle
                        </label>
                        <input id="sectionTypeSecondary" name="type" onChange={this.handleChange} type="radio" value="secondary" />
                        <label htmlFor="sectionTypeSecondary">
                            Secondary
                        </label>
                        <button disabled={!this.state.name && !this.state.type}>
                            Create
                        </button>
                    </form>
                </div>
                <ul className="list">
                    {this.renderSections()}
                </ul>
            </div>
        )
    }

    handleCreate = (e) => {
        e.preventDefault();
        const sectionsRef = firebase.database().ref('sections');
        const section = {
            name: this.state.name,
            type: this.state.type
        }
        sectionsRef.push(section);
        this.setState({ name: '', type: null });
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    renderSections = () => {
        return this.props.sectionList.map((section, i) => (
            <li>
                <Link className={section.type} to={`/section/${section.id}`}>{section.name}</Link>
            </li>
        ));
    }
}

const mapStateToProps = (state) => {
    return {
        sectionList: state.sections.list
    }
};

const mapDispatchToProps = {
    setSections
};

export default connect(mapStateToProps, mapDispatchToProps)(SectionListContainer);