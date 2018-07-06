import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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
                <header>Is anyone absent?</header>
                <main>
                    {this.renderStudents()}
                </main>
                <footer>
                    <div onClick={this.props.cancel}>Cancel</div>
                    <div onClick={this.setAttendance}>Continue</div>
                </footer>
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
                <li
                    className={present.includes(id) ? 'present' : 'absent'}
                    key={id}
                    onClick={() => this.togglePresent(id)}
                >
                    {student.name}
                </li>
            );
        }
        return <ul>{list}</ul>;
    };

    setAttendance = () => {
        return this.props.setAttendance(this.props.section, this.state.present);
    };

    togglePresent = (id) => {
        const present = [...this.state.present];
        if (present.includes(id)) {
            return this.setState({ present: present.filter(student => student !== id) });
        }
        present.push(id);
        return this.setState({ present });
    };
};

const mapStateToProps = (state) => {
    return {
        students: state.students.list
    };
};

const mapDispatchToProps = {
    setAttendance
};

StudentAttendance.propTypes = {
    cancel: PropTypes.func.isRequired,
    mode: PropTypes.string.isRequired,
    section: PropTypes.string.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentAttendance);