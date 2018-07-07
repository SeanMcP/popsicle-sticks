import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    getStudentsBySection
} from '../actions';
import { ObjVal, Shuffle } from '../utils';

class RandomContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            index: 0,
            list: this.props.attendance ? this.props.attendance : []
        };
    }
    componentDidMount() {
        this.props.getStudentsBySection(this.props.match.params.sectionId);
    }
    componentDidUpdate(prevProps) {
        if (!prevProps.attendance && this.props.attendance) {
            return this.setState({ list: this.props.attendance });
        }
        if (!ObjVal(prevProps.students) && ObjVal(this.props.students)) {
            return this.setState({ list: Object.keys(this.props.students) });
        }
    }
    render() {
        return (
            <div className="random-container">
                <Link to={`/section/${this.props.match.params.sectionId}`}>Back</Link>
                <h1>Random</h1>
                <div onClick={this.indexIncrement}>Next</div>
                <div onClick={this.indexDecrement}>Back</div>
                {this.renderCurrent()}
            </div>
        );
    }

    indexDecrement = () => {
        this.setState((prevState, props) => {
            const max = props.attendance ? props.attendance.length - 1 : Object.keys(props.students).length - 1;
            const nextIndex = prevState.index - 1;
            if (nextIndex < 0) {
                return {
                    index: max,
                    list: Shuffle(prevState.list)
                }
            }
            return {
                index: nextIndex
            };
        })
    }

    indexIncrement = () => {
        this.setState((prevState, props) => {
            const max = props.attendance ? props.attendance.length - 1 : Object.keys(props.students).length - 1;
            const nextIndex = prevState.index + 1;
            if (nextIndex > max) {
                return {
                    index: 0,
                    list: Shuffle(prevState.list)
                }
            }
            return {
                index: nextIndex
            };
        })
    }

    renderCurrent = () => {
        const { students } = this.props;
        const { index, list } = this.state;
        if (ObjVal(students) && list.length) {
            const current = students[list[index]];
            const next = students[list[index + 1]];
            const prev = students[list[index - 1]];
            return (
                <div className="students">
                    <div className="next">
                        Next up: {index + 1 >= list.length ? 'Random' : next.name}
                    </div>
                    <div className="current">
                        {current.name}
                    </div>
                    <div className="prev">
                        Previous: {index - 1 < 0 ? 'Random' : prev.name}
                    </div>
                </div>
            );
        }
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