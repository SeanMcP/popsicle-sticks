import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addSection, getSections } from '../actions';

class ScheduleContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            type: null,
        };
    }

    componentDidMount() {
        this.props.getSections();
    }

    render() {
        return (
            <div className="schedule-container">
                Class list container
                <div className="create">
                    <form onSubmit={this.handleCreate}>
                        <input name="name" onChange={this.handleChange} placeholder="Section name" type="text" value={this.props.name} />
                        <input id="section-type-elementary" name="type" onChange={this.handleChange} type="radio" value="elementary" />
                        <label htmlFor="section-type-elementary">
                            Elementary
                        </label>
                        <input id="section-type-middle" name="type" onChange={this.handleChange} type="radio" value="middle" />
                        <label htmlFor="section-type-middle">
                            Middle
                        </label>
                        <input id="section-type-secondary" name="type" onChange={this.handleChange} type="radio" value="secondary" />
                        <label htmlFor="section-type-secondary">
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

    handleCreate = e => {
        e.preventDefault();
        const { name, type } = this.state;
        this.props.addSection(name, type, 'Lorem ipsum');
        // TODO: Only clear on success
        this.setState({ name: '', type: null });
    };

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    renderSections = () => {
        const output = [];
        for (const id in this.props.sectionList) {
            const section = this.props.sectionList[id];
            output.push(
                <li key={output.length}>
                    <Link className={section.type} to={`/section/${id}`}>
                        {section.name}
                    </Link>
                </li>
            );
        }
        return output;
        // return this.props.sectionList.map((section, i) => (
            // <li>
            //     <Link className={section.type} to={`/section/${section.id}`}>{section.name}</Link>
            // </li>
        // ));
    }
}

const mapStateToProps = (state) => {
    return {
        sectionList: state.sections.list
    }
};

const mapDispatchToProps = {
    addSection,
    getSections
};

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleContainer);