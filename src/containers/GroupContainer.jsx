import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../components/atomic/Button';
import FullScreen from '../components/common/FullScreen';
import GroupBlock from '../components/group/GroupBlock';
import Icon from '../components/atomic/Icon';
import StudentCard from '../components/group/StudentCard';
import {
    getStudentsBySection
} from '../actions';
import {
    Capitalize,
    GroupStudents,
    Shuffle,
} from '../utils';

class GroupContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            gender: 'random',
            groups: [],
            level: 'random',
            sectionIndex: null,
            size: 4,
            studentId: null,
        }
    }

    componentDidMount() {
        this.props.getStudentsBySection(this.props.match.params.sectionId);
    }

    render() {
        return (
            <div className="group-container container">
                <h1>Group Maker</h1>
                {this.renderOptions()}
                <div className="option">
                    <h2>Group size</h2>
                    <div className="size-options">
                        <Button
                            handleClick={this.handleInputButton(-1)}
                            icon="fas fa-minus fa-lg fa-fw"
                        />
                        <input
                            onChange={this.handleInputChange}
                            type="number"
                            value={this.state.size}
                        />
                        <Button
                            handleClick={this.handleInputButton(+1)}
                            icon="fas fa-plus fa-lg fa-fw"
                        />
                    </div>
                </div>
                <Button
                    className="full"
                    handleClick={this.handleGroup}
                >
                    Make groups!
                </Button>
                <FullScreen
                    displayWhen={this.state.groups.length > 0}
                    title="Groups"
                >
                    <div className="groups">
                        {this.renderGroups()}
                    </div>
                </FullScreen>
            </div>
        )
    }

    getPresentStudents = () => {
        const { attendance, students } = this.props;

        if (attendance.length) {
            for (const id in students) {
                if (!attendance.includes(id)) {
                    delete students[id];
                }
            }
        }

        return students;
    }

    handleGroup = () => {
        const { gender, level, size } = this.state;
        const { sectionId } = this.props.match.params;
        const students = this.getPresentStudents();
        const groups = Shuffle(GroupStudents({ gender, level, sectionId, size, students }));
        
        return this.setState({ groups });
    }

    handleInputButton = (amount) => {
        return () => this.setState((prevState) => {
            const check = prevState.size + amount < 2 ? 2 : prevState.size + amount;
            return ({ size: check })
        });
    }

    handleInputChange = (e) => {
        this.setState({ size: e.target.value });
    }

    moveStudentToSection = (newSectionIndex) => () => {
        const { groups, sectionIndex, studentId } = this.state;
        if (sectionIndex >= 0 && sectionIndex !== newSectionIndex && studentId) {
            const updatedGroups = [...groups];

            updatedGroups[sectionIndex] = updatedGroups[sectionIndex].filter(id => id !== studentId);
            updatedGroups[newSectionIndex].push(studentId);

            return this.setState({
                groups: updatedGroups.filter(group => group.length),
                sectionIndex: null,
                studentId: ''
            });
        }
    }

    renderButtons = (option) => {
        const buttons = ['same', 'mixed', 'random'];
        const list = buttons.map((button, i) => (
            <Button
                className={`full ${this.state[option] === button ? 'selected' : ''}`}
                handleClick={this.updateState(option, button)}
                key={i}
            >
                {this.renderGroupExample(button)}
                {Capitalize(button)}
            </Button>
        ));
        return (
            <div className="options">{list}</div>
        )
    }

    renderGroupExample = (key) => {
        const hash = {
            'same': ['square', 'square'],
            'mixed': ['star', 'circle'],
            'random': ['dice'],
        }
        const icons = hash[key].map((option, i) => (
            <Icon key={i} icon={`fas fa-${option} fa-lg fa-fw`} />
        ));
        return (
            <div className="group-example">{icons}</div>
        )
    }

    renderGroups = () => {
        const { groups } = this.state;
        const { match : { params: { sectionId } }, students } = this.props;

        if (groups.length) {
            const groupList = groups.map((group, i) => {
                const studentList = group.map((studentId, j) => (
                    <StudentCard
                        gender={students[studentId].gender}
                        handleClick={this.selectStudent(i, studentId)}
                        highlight={students[studentId].sections[sectionId].highlight}
                        key={`${i}-${j}`}
                        name={students[studentId].name}
                        selected={studentId === this.state.studentId}
                    />
                ));

                return (
                    <GroupBlock
                        clickable={this.state.studentId !== null && this.state.sectionIndex !== i}
                        handleClick={this.moveStudentToSection(i)}
                        key={`group-${i + 1}`}
                        number={i + 1}
                    >
                        {studentList}
                    </GroupBlock>
                );
            });

            return groupList;
        }
    }

    renderOptions = () => {
        const options = ['gender', 'level'];
        return options.map((option, i) => {
            return (
                <div
                    className="option"
                    key={i}
                >
                    <h2>By {Capitalize(option)}</h2>
                    {this.renderButtons(option)}
                </div>
            )
        })
    }

    selectStudent = (sectionIndex, studentId) => {
        return () =>
            this.setState(
                prevState => ({
                    studentId:
                        prevState.studentId !== studentId
                        ? studentId
                        : null
                        ,
                    sectionIndex:
                        prevState.sectionIndex !== sectionIndex
                        ? sectionIndex
                        : null
                })
            );
    }

    updateState = (key, value) => {
        return () => this.setState({ [key]: value });
    }
}

const mapStateToProps = (state) => {
    return {
        attendance: state.students.attendance,
        students: state.students.list
    }
}

const mapDispatchToProps = {
    getStudentsBySection
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupContainer);