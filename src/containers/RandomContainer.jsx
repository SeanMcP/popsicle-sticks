import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '../components/atomic/Button';
import {
    getStudentsBySection
} from '../actions';
import { ObjVal, Shuffle } from '../utils';

class RandomContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            displayPreview: false,
            index: 0,
            list: this.props.attendance ? this.props.attendance : [],
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
            <div className="random container">
                <Link to={`/section/${this.props.match.params.sectionId}`}>Back</Link>
                <h1>Random</h1>
                {this.renderStudent()}
                <div className="buttons">
                    <Button
                        className="full"
                        handleClick={this.prevStudent}
                    >
                        Back
                    </Button>
                    <Button
                        className="full"
                        handleClick={this.nextStudent}
                    >
                        Next
                    </Button>
                </div>
                <Button
                    className="secondary full"
                    handleClick={this.togglePreview}
                    icon={`far fa-eye${this.state.displayPreview ? '-slash' : ''}`}
                >
                    {`${this.state.displayPreview ? 'Hide' : 'Show'} preview`}
                </Button>
            </div>
        );
    }

    prevStudent = () => {
        this.setState((prevState, props) => {
            const max = props.attendance ? props.attendance.length - 1 : Object.keys(props.students).length - 1;
            const prevIndex = prevState.index - 1;
            if (prevIndex < 0) {
                return {
                    index: max,
                    list: Shuffle(prevState.list)
                }
            }
            return {
                index: prevIndex
            };
        })
    }

    nextStudent = () => {
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

    renderStudent = () => {
        const { students } = this.props;
        const { displayPreview, index, list } = this.state;
        if (ObjVal(students) && list.length) {
            const current = students[list[index]];
            const next = students[list[index + 1]];
            const prev = students[list[index - 1]];
            return (
                <div className="students">
                    {displayPreview ? (
                        <div className="next">
                            Next: {index + 1 >= list.length ? 'Random' : next.name}
                        </div>
                    ) : null}
                    <div className="current">
                        {current.name}
                    </div>
                    {displayPreview ? (
                        <div className="prev">
                            Back: {index - 1 < 0 ? 'Random' : prev.name}
                        </div>
                    ) : null}
                </div>
            );
        }
    }

    togglePreview = () => {
        this.setState((prevState) => ({
            displayPreview: !prevState.displayPreview
        }));
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