import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import SelectGender from './common/SelectGender';
import SelectLevel from './common/SelectLevel';

class SectionRow extends Component {
    constructor(props) {
        super(props);

        this.state = {
            gender: this.props.gender,
            level: this.props.level,
            name: this.props.name,
        };
    }

    render() {
        return <div className="section-row" style={styles}>
                <input disabled={this.props.disabled} name="name" onChange={this.handleChange} placeholder="Student name" value={this.state.name} />
                <SelectGender
                    disabled={this.props.disabled}
                    handleChange={this.handleChange}
                    value={this.state.gender}
                />
                <SelectLevel
                    disabled={this.props.disabled}
                    handleChange={this.handleChange}
                    value={this.state.level}
                />
                <span onClick={() => this.props.editStudent(this.props.id)}>Edit</span>
                <Link to={`/student/${this.props.id}`}>
                    View student
                </Link>
            </div>;
    };

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };
};

const styles = {
    display: 'flex'
};

SectionRow.propTypes = {
    disabled: PropTypes.bool.isRequired
};

export default SectionRow;