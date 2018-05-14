import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class SectionListContainer extends Component {
    render() {
        return (
            <div className="class-container">
                Class list container
                <div className="class-list">
                    
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        sections: state.sections
    }
}

export default connect(mapStateToProps, null)(SectionListContainer);