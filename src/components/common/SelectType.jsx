import React from 'react';
import PropTypes from 'prop-types';
import Select from '../atomic/Select';

const SelectType = (props) => (
    <Select
        {...props}
        name="type"
        options={['math', 'science', 'social studies', 'language arts', 'general education'].sort()}
    />
);

SelectType.propTypes = {
    disabled: PropTypes.bool,
    handleChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
};

export default SelectType;