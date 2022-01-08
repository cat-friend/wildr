import React from 'react';
import { NavLink } from "react-router-dom";
import { useSelector } from 'react-redux';
import LoginFormModal from '../LoginFormModal';
import ProfileButton from "./ProfileButton";
import './Navigation.css'

const Navigation = ({ isRestored }) => {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <ProfileButton user={sessionUser} />
        )
    }
    else {
        sessionLinks = (
            <>
                <LoginFormModal />
                <NavLink to="/signup">Sign Up</NavLink>
            </>
        );
    }
    return (
        <ul>
            <li><NavLink to="/">Homepage</NavLink></li>
            {isRestored ?
                <>
                    {sessionLinks}
                </>
                :
                <>
                    <li key="signup">
                        <NavLink to="/signup">
                            Sign Up!
                        </NavLink>
                    </li>
                    <li key="login">
                        <NavLink to="/login">
                            Log in
                        </NavLink>
                    </li>
                </>}
        </ul>
    );
}


export default Navigation;