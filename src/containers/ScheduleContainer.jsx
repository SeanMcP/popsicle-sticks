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
                Class list container
                {this.state.displayCreator
                    ? <SectionCreator handleClose={this.toggleCreator} />
                    : <div onClick={this.toggleCreator}>Add section</div>
                }
                <ul className="list">
                    {this.renderSections()}
                </ul>
            </div>
        )
    }

    renderSections = () => {
        const output = [];
        for (const id in this.props.sectionList) {
            const section = this.props.sectionList[id];
            output.push(
                <li key={output.length}>
                    <Link className={section.type} to={`/section/${id}`}>
                        {section.name}
                    </Link>
                </li>
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