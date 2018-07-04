import React from 'react';
import PropTypes from 'prop-types';
import Select from '../atomic/Select';

const SelectLevel = (props) => (
    <Select
        {...props}
        name="level"
        options={['advanced', 'proficient', 'basic']}
    />
);

SelectLevel.propTypes = {
    disabled: PropTypes.bool,
    handleChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
};

export default SelectLevel;