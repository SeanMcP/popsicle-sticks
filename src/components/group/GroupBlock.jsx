import React from 'react';
import PropTypes from 'prop-types';

const GroupBlock = (props) => (
    <div
        className={`group-block ${props.clickable ? 'click' : ''}`}
        onClick={props.handleClick}
    >
        <h4>Group {props.number}</h4>
        <div className="group">
            {props.children}
        </div>
    </div>
);

GroupBlock.propTypes = {
    children: PropTypes.arrayOf(PropTypes.element),
    clickable: PropTypes.bool.isRequired,
    handleClick: PropTypes.func.isRequired,
    number: PropTypes.number.isRequired
}

export default GroupBlock;