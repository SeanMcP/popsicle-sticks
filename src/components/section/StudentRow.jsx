import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import SelectLevel from '../common/SelectLevel';

const StudentRow = (props) => (
    <tr className="section-row">
        <td className="name">{props.name}</td>
        <td className="gender">{props.gender === 'female' ? '♀' : '♂'}</td>
        <td>
            <SelectLevel
                handleChange={(e) => props.handleChange(props.id, e.target.value)}
                value={props.level}
            />
        </td>
        <td><Link to={`/student/${props.id}`}>View</Link></td>
    </tr>
);

StudentRow.propTypes = {
    gender: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    level: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
};

export default StudentRow;