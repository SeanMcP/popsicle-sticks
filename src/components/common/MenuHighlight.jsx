import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Menu from '../atomic/Menu';
import { highlightStudent } from '../../actions';
import { Capitalize } from '../../utils';

const MenuHighlight = (props) => {
    const generateOptions = () => {
        const colors = ['yellow', 'pink', 'orange', 'none']
        return colors.map(color => ({
            display: (
                <Fragment>
                    <div className={`color-bubble ${color}`}/>
                    {Capitalize(color)}
                </Fragment>
            ),
            action: () => props.highlightStudent(
                props.studentId,
                props.sectionId,
                color === 'none' ? '' : color
            )
        }))
    }
    return (
        <Menu
            icon="fas fa-highlighter"
            options={generateOptions()}
        />
    );
}

MenuHighlight.propTypes = {
    sectionid: PropTypes.string.isRequired,
    studentId: PropTypes.string.isRequired
}

const mapDispatchToProps = {
    highlightStudent
}

export default connect(null, mapDispatchToProps)(MenuHighlight);