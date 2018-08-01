import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../atomic/Icon';
import Open from '../renderProps/Open';

const Menu = (props) => {
    const renderOptions = (openProps) => {
        const options = props.options.map((option, i) => (
            <div
                className="option"
                onClick={option.action}
                key={i}
            >
                {option.display}
            </div>
        ));

        return (
            <div
                className="options"
                onClick={openProps.close}
            >
                {options}
            </div>
        );
    }
    return (
        <Open>
            {openProps => (
                <div className={`menu ${openProps.isOpen ? 'open' : 'closed'}`}>
                    <Icon
                        handleClick={openProps.open}
                        icon={props.icon}
                    />
                    {openProps.isOpen ? (
                        renderOptions(openProps)
                    ) : null}
                    {openProps.isOpen ? (
                        <div
                            className="overlay"
                            onClick={openProps.close}
                        />
                    ) : null}
                </div>
            )}
        </Open>
    );
}

Menu.propTypes = {
    icon: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            display: PropTypes.node.isRequired,
            action: PropTypes.func.isRequired
        }).isRequired
    ).isRequired
}

export default Menu;