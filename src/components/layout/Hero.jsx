import React from 'react';
import PropTypes from 'prop-types';

const Hero = ({ className, heading }) => (
    <div className={`hero ${className ? className : ''}`}>
        <div className="container">
            <h1>{heading}</h1>
        </div>
    </div>
)

Hero.propTypes = {
    className: PropTypes.string,
    heading: PropTypes.string.isRequired
}

export default Hero;