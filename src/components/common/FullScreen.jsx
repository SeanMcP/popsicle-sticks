import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../atomic/Icon';
import Open from '../renderProps/Open';

const FullScreen = (props) => {
    if (!props.displayWhen) {
        return null;
    }
    return (
        <Open>
            {(openProps) => (
                <div className={`full-screen ${openProps.isOpen ? 'open' : ''} ${props.className ? props.className : ''}`}>
                    {openProps.isOpen ? (<h1>{props.title}</h1>) : ''}
                    <Icon
                        handleClick={openProps.toggle}
                        icon={`fas fa-${openProps.isOpen ? 'compress' : 'expand'} fa-lg`}
                    />
                    {props.children}
                </div>
            )}
        </Open>
    );
}

FullScreen.propTypes = {
    children: PropTypes.element.isRequired,
    className: PropTypes.string,
    displayWhen: PropTypes.bool.isRequired,
    title: PropTypes.string
}

export default FullScreen;