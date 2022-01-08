import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";

const Navigation = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(sessionActions.sessionRestore()).then(() => setIsRestored(true));
    }, [dispatch]);
    const sessionUser = useSelector(state => state.session.user);
    return (<>
        <ul>
            <li><NavLink to="/">Homepage</NavLink></li>
            {sessionUser ?
                <>
                    <ProfileButton />
                    <li key="logout">
                        <button onclick="/logout" type="button">
                            Logout
                        </button>
                    </li>
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
    </>)
}


export default Navigation;
