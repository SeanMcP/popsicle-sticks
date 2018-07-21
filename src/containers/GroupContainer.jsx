import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../components/atomic/Button';
import Icon from '../components/atomic/Icon';
import { Capitalize } from '../utils';

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
                <Button className="full">
                    Make groups!
                </Button>
            </div>
        )
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

export default connect(mapStateToProps)(GroupContainer);