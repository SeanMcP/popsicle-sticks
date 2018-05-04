import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import consume from '../context';

class ClassListContainer extends Component {
    componentDidMount() {
        this.props.context.actions.getClassList();
    }

    render() {
        return (
            <div className="class-container">
                Class list container
                <div className="class-list">
                    {this._renderClasses()}
                </div>
            </div>
        );
    }

    _renderClasses() {
        const { classList } = this.props.context.store;
        const output = [];

        for (const classId in classList) {
            const current = classList[classId];
            output.push(
                <div className="class" key={output.length}>
                    <Link to={`/class/${classId}`}>
                        {current.title}
                    </Link>
                </div>
            );
        }

        return output;
    }
}

export default consume(ClassListContainer);