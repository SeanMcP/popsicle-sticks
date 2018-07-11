import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '../components/atomic/Button';
import Icon from '../components/atomic/Icon';
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
                    : <Button handleClick={this.toggleCreator} icon="fas fa-plus">Add section</Button>
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
                    <Icon icon="fas fa-chalkboard fa-3x"/>
                    <span>{section.name}</span>
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