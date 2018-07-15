import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import SelectLevel from '../common/SelectLevel';

const SectionRow = (props) => (
    <div className="section-row">
        <div className="name">
            <Link to={`/section/${props.id}`}>
                {props.name}
            </Link>
        </div>
        <div className="level">
            <SelectLevel
                handleChange={(e) => props.handleChange(props.id, e.target.value)}
                value={props.level}
            />
        </div>
        <div className="buttons">
            <div className="faux-link" onClick={() => props.handleRemove(props.id)}>
                Remove
            </div>
        </div>
    </div>
);

SectionRow.propTypes = {
    handleChange: PropTypes.func.isRequired,
    handleRemove: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    level: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
};

export default SectionRow;