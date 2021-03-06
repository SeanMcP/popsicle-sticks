import React from 'react';
import PropTypes from 'prop-types';

const Icon = (props) => (
    <div
        className={`icon ${props.className ? props.className : ''} ${props.handleClick ? 'click' : ''}`}
        onClick={props.handleClick || null}
    >
        <i className={props.icon} aria-hidden="true" />
    </div>
);

Icon.propTypes = {
    className: PropTypes.string,
    handleClick: PropTypes.func,
    icon: PropTypes.string.isRequired,
};

export default Icon;