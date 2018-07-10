import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import SectionCreator from '../components/schedule/SectionCreator';
import { getSections } from '../actions';

class ScheduleContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            displayCreator: false
        };
    }

    componentDidMount() {
        this.props.getSections();
    }

    render() {
        return (
            <div className="schedule-container">
                <h1>Your schedule</h1>
                {this.state.displayCreator
                    ? <SectionCreator handleClose={this.toggleCreator} />
                    : <div onClick={this.toggleCreator}>Add section</div>
                }
                <div className="list">
                    {this.renderSections()}
                </div>
            </div>
        )
    }

    renderSections = () => {
        const output = [];
        for (const id in this.props.sectionList) {
            const section = this.props.sectionList[id];
            output.push(
                <Link
                    className={`section ${section.type}`}
                    key={id}
                    to={`/section/${id}`}
                >
                    {section.name}
                </Link>
            );
        }
        return output;
    }

    toggleCreator = () => {
        return this.setState((prevState) => (
            { displayCreator: !prevState.displayCreator }
        ));
    }
}

const mapStateToProps = (state) => {
    return {
        sectionList: state.sections.list
    }
};

const mapDispatchToProps = {
    getSections
};

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleContainer);