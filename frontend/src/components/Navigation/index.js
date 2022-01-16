import React from 'react';
import { NavLink, Redirect } from "react-router-dom";
import { useSelector } from 'react-redux';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css'
import CRUDImageFormModal from "../EditImageModal";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import RegisterFormModal from '../RegisterFormModal';

const Navigation = ({ isRestored }) => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    let sessionLinks;
    const modalData = {};
    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
        <Redirect to='/' />
    };

    if (sessionUser) {
        modalData.crudAction = "create";
        modalData.imageId = -1;
        sessionLinks = (
            <>
                <h2>Welcome, {sessionUser.username}!</h2>
                <div>
                    <NavLink className="navlink" to="/images">Browse Images</NavLink>
                </div>
                <div>
                    <CRUDImageFormModal modalData={modalData} />
                </div>
                <div>
                    <NavLink className="navlink" onClick={logout} to="#">Log Out</NavLink>
                </div>
            </>
        )
    }
    else {
        sessionLinks = (
            <>
                <div>
                    <NavLink className="navlink" to="/images">Browse Images</NavLink>
                </div>
                <div><LoginFormModal /></div>
                <div><RegisterFormModal /></div>
            </>
        );
    }
    return (
        <nav>
            <div className='logo title'>
                <NavLink to="/" className="nav-items">
                    <img src='/logo.png' alt="logo for Wildr" />
                    Wildr
                </NavLink>
            </div>
            {isRestored && sessionLinks}
        </nav >
    );
}


export default Navigation;
