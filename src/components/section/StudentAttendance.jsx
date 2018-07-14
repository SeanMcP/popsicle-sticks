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
            present: Object.keys(this.props.students)
        };
    };

    render() {
        return (
            <div className="student-attendance">
                <h2>Is anyone absent?</h2>
                {this.renderStudents()}
                <div className="buttons">
                    <Button handleClick={this.setAttendance}>
                        Continue
                    </Button>
                    <Button className="secondary" handleClick={this.props.handleClose}>
                        Cancel
                    </Button>
                </div>
            </div>
        );
    };

    renderStudents = () => {
        const { present } = this.state;
        const { students } = this.props;
        const list = [];
        for (const id in students) {
            const student = students[id];
            list.push(
                <div
                    className={`student ${present.includes(id) ? 'present' : 'absent'}`}
                    key={id}
                    onClick={() => this.togglePresent(id)}
                >
                    {student.name}
                </div>
            );
        }
        return <div className="student-list">{list}</div>;
    };

    setAttendance = () => {
        this.props.setAttendance(this.props.section, this.state.present);
        this.props.handleClose();
        return this.props.history.push(`${this.props.section}/${this.props.mode}`);
    };

    togglePresent = (id) => {
        const present = [...this.state.present];
        if (present.includes(id)) {
            return this.setState({ present: present.filter(student => student !== id) });
        }
        present.push(id);
        return this.setState({ present });
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