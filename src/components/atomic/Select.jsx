import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Icon from './Icon';
import { Capitalize } from '../../utils';

class Select extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false
        };
    }
    render() {
        const options = this.props.options.map(option => (
            <div
                className="option"
                key={option}
                onClick={this.selectOption(option)}
            >
                {Capitalize(option)}
            </div>
        ));
        const { isOpen } = this.state;
        return (
            <Fragment>
                {this.props.label ? <label htmlFor={this.props.name} onClick={this.props.disabled ? null : this.toggleMenu}>{this.props.label}</label> : null}
                <div
                    className={`select-menu input ${
                        isOpen ? 'open' : 'closed'
                    } ${
                        this.props.disabled ? 'disabled' : ''
                    } ${
                        this.props.value ? 'has-value' : ''
                    }`}
                    onClick={this.toggleMenu}
                    id={this.props.name}
                >
                    <div className="value">{Capitalize(this.props.value || this.props.placeholder || 'Select one')}</div>
                    <Icon icon={`fas fa-chevron-${isOpen ? 'up' : 'down'}`} />
                    {isOpen ? <div className="menu">{options}</div> : null}
                </div>
                {isOpen ? <div className="overlay" onClick={this.toggleMenu}/> : null}
            </Fragment>
        );
    }

    selectOption = (value) => {
        return () => this.props.handleChange({ target: { name: this.props.name, value }});
    }

    toggleMenu = () => {
        return this.setState((prevState) => ({ isOpen: !prevState.isOpen }));
    }
};

Select.propTypes = {
    disabled: PropTypes.bool,
    handleChange: PropTypes.func.isRequired,
    label: PropTypes.string,
    options: PropTypes.array.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
};

export default Select;