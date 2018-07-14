import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import SelectLevel from '../common/SelectLevel';

const StudentRow = (props) => (
    <div className="student-row">
        <div className="name">
            <span>{props.name}</span>
            <span className="gender">
                {props.gender === 'female' ? '♀' : '♂'}
            </span>
        </div>
        <div className="level">
            <SelectLevel
                handleChange={(e) => props.handleChange(props.id, e.target.value)}
                value={props.level}
            />
        </div>
        <div className="buttons"><Link to={`/student/${props.id}`}>View</Link></div>
    </div>
);

StudentRow.propTypes = {
    gender: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    level: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
};

export default StudentRow;