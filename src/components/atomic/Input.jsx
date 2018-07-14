import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const Input = (props) => (
    <Fragment>
        {props.label ? <label htmlFor={props.name}>{props.label}</label> : null}
        <input
            id={props.name}
            name={props.name}
            onChange={props.handleChange}
            placeholder={props.placeholder}
            type={props.type || 'text'}
            value={props.value}
        />
    </Fragment>
);

Input.protoTypes = {
    handleChange: PropTypes.func.isRequired,
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.string,
}

export default Input;