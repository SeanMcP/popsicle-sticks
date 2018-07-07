import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    getStudentsBySection
} from '../actions';

class RandomContainer extends Component {
    componentDidMount() {
        this.props.getStudentsBySection(this.props.match.params.sectionId);
    }
    render() {
        return (
            <div className="random-container">
                Random
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        attendance: state.students.attendance[ownProps.match.params.sectionId],
        students: state.students.list
    };
}

const mapDispatchToProps = {
    getStudentsBySection
}

export default connect(mapStateToProps, mapDispatchToProps)(RandomContainer);