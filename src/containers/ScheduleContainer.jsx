import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '../components/atomic/Button';
import Icon from '../components/atomic/Icon';
import { getSections, setModal } from '../actions';

class ScheduleContainer extends Component {

    componentDidMount() {
        this.props.getSections();
    }

    render() {
        return (
            <div className="schedule container">
                <h1>Your schedule</h1>
                <Button
                    handleClick={this.openCreator}
                    icon="fas fa-plus"
                >
                    Add section
                </Button>
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

    openCreator = () => {
        return this.props.setModal({ name: 'SectionCreator' });
    }
}

const mapStateToProps = (state) => {
    return {
        sectionList: state.sections.list
    }
}

const mapDispatchToProps = {
    getSections,
    setModal
}

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleContainer);