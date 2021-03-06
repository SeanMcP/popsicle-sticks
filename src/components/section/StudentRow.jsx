import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Gender from '../common/Gender';
import MenuHighlight from '../common/MenuHighlight';
import SelectLevel from '../common/SelectLevel';

const StudentRow = (props) => {
    return (
        <div className="student-row">
            <div className="name">
                <Link to={`/student/${props.id}`}>
                    <span className={props.highlight ? `highlighted ${props.highlight}` : ''}>
                        {props.name}
                    </span>
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
                <MenuHighlight sectionId={props.sectionId} studentId={props.id} />
                <div className="faux-link" onClick={() => props.handleRemove(props.id)}>
                    Remove
                </div>
            </div>
        </div>
    );
}

StudentRow.propTypes = {
    gender: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleRemove: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    level: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    sectionId: PropTypes.string.isRequired
};

export default StudentRow;