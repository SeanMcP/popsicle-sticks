import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import SelectLevel from '../common/SelectLevel';

class StudentRow extends Component {
    constructor(props) {
        super(props);

        this.state = {
            level: this.props.level,
        };
    }

    render() {
        return (
            <tr className="section-row">
                <td className="name">{this.props.name}</td>
                <td className="gender">{this.props.gender === 'female' ? '♀' : '♂'}</td>
                <td>
                    <SelectLevel
                        disabled={this.props.disabled}
                        handleChange={this.handleChange}
                        value={this.state.level}
                    />
                </td>
                <td><span onClick={() => this.props.editStudent(this.props.id)}>Edit</span></td>
                <td><Link to={`/student/${this.props.id}`}>View</Link></td>
                <td>{this.props.level !== this.state.level ? (<span>Save</span>) : null}</td>
            </tr>
        );
    };

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };
};

StudentRow.propTypes = {
    disabled: PropTypes.bool.isRequired
};

export default StudentRow;