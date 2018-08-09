import React from 'react';
import { connect } from 'react-redux';
import Icon from '../atomic/Icon';
import { userSignOut } from '../../actions';

const Header = (props) => (
    <header className="app-header">
        <div className="logo">Popsicle Sticks</div>
        {props.authenticated ? (
            <Icon
                handleClick={props.userSignOut}
                icon="fas fa-sign-out-alt"
            />
        ) : ''}
    </header>
);

const mapDispatchToProps = {
    userSignOut
}

const mapStateToProps = (state) => ({
    authenticated: state.session.authenticated,
    user: state.session.user
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);