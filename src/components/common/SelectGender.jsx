import React from 'react';
import PropTypes from 'prop-types';
import Select from '../atomic/Select';

const SelectGender = (props) => (
    <Select
        {...props}
        name="gender"
        options={['female', 'male']}
    />
);

SelectGender.propTypes = {
    disabled: PropTypes.bool,
    handleChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
};

export default SelectGender;