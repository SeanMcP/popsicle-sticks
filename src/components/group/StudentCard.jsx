import React from 'react';
import PropTypes from 'prop-types';

const StudentCard = (props) => (
    <div
        className={`student ${props.gender} ${
            props.selected ? 'selected' : ''
        } ${
            props.highlight ? `highlighted ${props.highlight}` : ''
        }`}
        onClick={props.handleClick}
    >
        {props.name}
    </div>
);

StudentCard.propTypes = {
    gender: PropTypes.string.isRequired,
    handleClick: PropTypes.func.isRequired,
    highlight: PropTypes.string,
    name: PropTypes.string.isRequired,
    selected: PropTypes.bool.isRequired,
}

export default StudentCard;