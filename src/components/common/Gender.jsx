import React from 'react';
import PropTypes from 'prop-types';

const Gender = (props) => (
    <span className="gender">
        {props.type === 'female' ? '♀' : '♂'}
    </span>
)

Gender.propTypes = {
    type: PropTypes.string.isRequired
}

export default Gender;