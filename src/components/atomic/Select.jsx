import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Capitalize } from '../../utils';

const Select = (props) => {
    const options = [<option key="initial" value="">Select one</option>];
    props.options.forEach(option => {
        options.push(
            <option key={option} value={option}>
                {Capitalize(option)}
            </option>
        );
    });
    return (
        <Fragment>
            {props.label ? <label htmlFor={props.name}>{props.label}</label> : null}
            <select
                disabled={typeof props.disabled === 'undefined' ? false : props.disabled}
                id={props.name}
                name={props.name}
                onChange={props.handleChange}
                value={props.value}
            >
                {options}
            </select>
        </Fragment>
    );
};

Select.propTypes = {
    disabled: PropTypes.bool,
    handleChange: PropTypes.func.isRequired,
    label: PropTypes.string,
    options: PropTypes.array.isRequired,
    value: PropTypes.string.isRequired,
};

export default Select;