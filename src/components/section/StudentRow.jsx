import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Gender from '../common/Gender';
import Icon from '../atomic/Icon';
import SelectLevel from '../common/SelectLevel';

const StudentRow = (props) => (
    <div className="student-row">
        <div className="name" style={{ backgroundColor: props.highlight ? props.highlight : 'none' }}>
            <Link to={`/student/${props.id}`}>
                {props.name}
            </Link>
            <Gender type={props.gender} />
        </div>
        <div className="level">
            <SelectLevel
                handleChange={(e) => props.handleChange(props.id, e.target.value)}
                value={props.level}
            />
        </div>
        <div className="buttons">
            <Icon handleClick={props.handleHighlight} icon="fas fa-highlighter"/>
            <div className="faux-link" onClick={() => props.handleRemove(props.id)}>
                Remove
            </div>
        </div>
    </div>
);

StudentRow.propTypes = {
    gender: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleRemove: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    level: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
};

export default StudentRow;