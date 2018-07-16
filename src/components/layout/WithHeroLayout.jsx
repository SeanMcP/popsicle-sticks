import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Hero from './Hero';

const WithHeroLayout = (props) => (
    <Fragment>
        <Hero
            button={props.button}
            className={props.className}
            heading={props.heading}
        />
        {props.children}
    </Fragment>
)

WithHeroLayout.propTypes = {
    button: PropTypes.element,
    className: PropTypes.string,
    heading: PropTypes.string.isRequired
}

export default WithHeroLayout;