import React from 'react';
import { NavLink } from "react-router-dom";
import { useSelector } from 'react-redux';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css'
import CRUDImageFormModal from "../EditImageModal";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';

const Navigation = ({ isRestored }) => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    console.log("isRestored", isRestored);
    let sessionLinks;
    const modalData = {};
    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
    };

    if (sessionUser) {
        modalData.crudAction = "create";
        modalData.imageId = -1;
        sessionLinks = (
            <>
                <div>Welcome, {sessionUser.username}!</div>
                <div>
                </div>
                <div>
                    <CRUDImageFormModal modalData={modalData} />
                </div>
                <div>
                    <button onClick={logout} className="dark-button">Log Out</button>
                </div>
            </>
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
            <div className='logo title'>
                <NavLink to="/" className="nav-items"><img src='/logo.png' alt="logo for Wildr" />
                    Wildr</NavLink>
            </div>
            {isRestored && sessionLinks}
        </div >
    );
}


export default Navigation;
