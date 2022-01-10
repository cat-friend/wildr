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
            <div>
                <ProfileButton user={sessionUser} />
            </div>
        )
    }
    else {
        sessionLinks = (
            <>
                <div><LoginFormModal /></div>
                <div><NavLink to="/signup" className="nav-items">Sign Up</NavLink></div>
            </>
        );
    }
    return (
        <div className='navbar'>
            <div className='logo'>
                <img src='./logo.png' alt="logo for Wildr" />
                <h1>Wildr</h1>
            </div>
            <div><NavLink to="/" className="nav-items">Homepage</NavLink></div>
            {isRestored ?
                <>
                    {sessionLinks}
                </>
                : <>
                    <div>
                        <NavLink to="/signup" className="nav-items">
                            Sign Up!
                        </NavLink>
                    </div>
                    <div>
                        <NavLink to="/login" className="nav-items">
                            Log in
                        </NavLink>
                    </div>
                </>
            }
        </div >
    );
}


export default Navigation;
