import React, { Component } from 'react';
import { connect } from 'react-redux';

class GroupContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            gender: 'random',
            level: 'random',
            size: 4
        }
    }

    render() {
        return (
            <div className="group-container">
                <h1>Group Maker</h1>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        attendance: state.students.attendance,
        students: state.students.list
    }
}

export default connect(mapStateToProps)(GroupContainer);