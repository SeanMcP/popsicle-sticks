import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import MenuHighlight from '../common/MenuHighlight';
import SelectLevel from '../common/SelectLevel';

const SectionRow = (props) => (
    <div className="section-row">
        <div className="name">
            <Link to={`/section/${props.id}`}>
                <span className={props.highlight ? `highlighted ${props.highlight}` : ''}>
                    {props.name}
                </span>
            </Link>
        </div>
        <div className="level">
            <SelectLevel
                handleChange={(e) => props.handleChange(props.id, e.target.value)}
                value={props.level}
            />
        </div>
        <div className="buttons">
            <MenuHighlight sectionId={props.id} studentId={props.studentId} />
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
    name: PropTypes.string.isRequired,
    studentId: PropTypes.string.isRequired
};

export default SectionRow;