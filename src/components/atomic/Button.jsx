import React from 'react';
import PropTypes from 'prop-types';
import Icon from './Icon';

const Button = (props) => (
    <div
        className={`button ${props.className ? props.className : ''}`}
        onClick={props.handleClick || null}
    >
        {props.icon ? (
            <Icon icon={props.icon} />
        ) : null}
        {props.children}
    </div>
);

Button.propTypes = {
    className: PropTypes.string,
    handleClick: PropTypes.func,
};

export default Button;