import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from '../../store/session';
import { Redirect } from "react-router-dom";
import './LoginForm.css';

const LoginFormPage = () => {
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    if (sessionUser) return (
        <Redirect to="/" />
    );

    const onSubmit = async (e) => {
        e.preventDefault();
        const payload = { credential, password };
        setErrors([]);
        return dispatch(sessionActions.login(payload))
            .catch(async (response) => {
                const data = await response.json();
                if (data && data.errors) setErrors(data.errors);
            });
    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <ul>
                    {errors.map((error, i) => <li key={i}>{error}</li>)}
                </ul>
                <input
                    value={credential}
                    onChange={(e) => setCredential(e.target.value)}
                    placeholder="Enter email or username"
                    required
                    type="text"
                >
                </input>
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    plassholder="Enter password"
                    required
                    type="password">
                </input>
                <button type="submit">Log In</button>
            </form>
        </>)
}

export default LoginFormPage;
