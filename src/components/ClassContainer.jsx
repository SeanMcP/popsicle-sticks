import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import consume from '../context';

class ClassContainer extends Component {
    render() {
        const { classId } = this.props.match.params;
        return (
            <div className="class-container">
                <Link to="/">Back</Link>
                <br/>
                <h1>Class</h1>
                Id: {classId}
                <br/>
                Name: {this.props.context.store.classList[classId].title}
            </div>
        );
    }
}

export default consume(ClassContainer);