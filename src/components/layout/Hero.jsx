import React from 'react';
import PropTypes from 'prop-types';

const Hero = ({ button, className, heading }) => (
    <div className={`hero ${className ? className : ''}`}>
        <div className="container">
            <h1>{heading}</h1>
            {button ? button : null}
        </div>
    </div>
)

Hero.propTypes = {
    button: PropTypes.element,
    className: PropTypes.string,
    heading: PropTypes.string.isRequired
}

export default Hero;