import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Hero from './Hero';

const WithHeroLayout = (props) => (
    <Fragment>
        <Hero
            heading={props.heading}
            className={props.heroClassName}
        />
        {props.children}
    </Fragment>
)

WithHeroLayout.propTypes = {
    className: PropTypes.string,
    heading: PropTypes.string.isRequired
}

export default WithHeroLayout;