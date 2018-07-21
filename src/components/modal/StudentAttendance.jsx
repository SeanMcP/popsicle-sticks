import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Button from '../atomic/Button';
import {
    setAttendance
} from '../../actions';

class StudentAttendance extends Component {
    constructor(props) {
        super(props);

        this.state = {
            absent: [],
        };
    };

    render() {
        return (
            <div className="student-attendance creator">
                <h2>Is anyone absent?</h2>
                <p>Click to move students from 'present' to 'absent' or <i>vice versa</i>.</p>
                <div className="student-list">
                    {this.renderPresent()}
                    {this.renderAbsent()}
                </div>
                <div className="buttons">
                    <Button className="full" handleClick={this.setAttendance}>
                        Continue
                    </Button>
                    <Button className="secondary full" handleClick={this.props.handleClose}>
                        Cancel
                    </Button>
                </div>
            </div>
        );
    };

    renderAbsent = () => {
        const { absent } = this.state;
        const { students } = this.props;
        const list = absent.map(id => (
            <div
                className="student absent"
                key={id}
                onClick={() => this.toggleAbsent(id)}
            >
                {students[id].name}
            </div>
        ));
        return (
            <div className="absent">
                <h3>Absent ({list.length})</h3>
                <div className="list">
                    {list}
                </div>
            </div>
        )
    }

    renderPresent = () => {
        const { absent } = this.state;
        const { students } = this.props;
        const list = [];
        for (const id in students) {
            if (!absent.includes(id)) {
                const student = students[id];
                list.push(
                    <div
                        className="student"
                        key={id}
                        onClick={() => this.toggleAbsent(id)}
                    >
                        {student.name}
                    </div>
                );
            }
        }
        return (
            <div className="present">
                <h3>Present ({list.length})</h3>
                <div className="list">
                    {list}
                </div>
            </div>
        )
    }

    setAttendance = () => {
        const present = Object.keys(this.props.students).filter(id => !this.state.absent.includes(id));
        this.props.setAttendance(this.props.section, present);
        this.props.handleClose();
        return this.props.history.push(`${this.props.section}/${this.props.mode}`);
    };

    toggleAbsent = (id) => {
        const absent = [...this.state.absent];
        if (absent.includes(id)) {
            return this.setState({ absent: absent.filter(student => student !== id) });
        }
        absent.push(id);
        return this.setState({ absent });
    };
}

const mapStateToProps = (state) => {
    return {
        students: state.students.list
    };
}

const mapDispatchToProps = {
    setAttendance
}

StudentAttendance.propTypes = {
    handleClose: PropTypes.func.isRequired,
    mode: PropTypes.string.isRequired,
    section: PropTypes.string.isRequired,
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(StudentAttendance)
);