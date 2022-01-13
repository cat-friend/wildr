import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from '../../store/session'
import { Redirect } from "react-router-dom";

function RegisterForm() {
    // userna;me, email, password, conforim password
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPw, setConfirmPw] = useState('');
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

    if (sessionUser) return (
        <Redirect to="/" />
    );
    const demoUser = async (e) => {
        e.preventDefault();
        const payload = {
            credential: "demo@user.io",
            password: "password01"
        }
        return dispatch(sessionActions.login(payload))
            .catch(async (response) => {
                const data = await response.json();
                if (data && data.errors) setErrors(data.errors);
            });
    }

    const onSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        const payload = { username, email, confirmPw, password };
        if (confirmPw === password) {
            setErrors([]);
            return dispatch(sessionActions.signup(payload))
                .catch(async (response) => {
                    const data = await response.json();
                    if (data && data.errors) setErrors(data.errors)
                });
        };
        return setErrors(['Confirm Password and Password fields must match.'])
    }

    return (
        <div className="login-form">
            <ul className="error-list">
                {errors.map((error, i) => <li key={i} className="errors">{error}</li>)}
            </ul>
            <form onSubmit={onSubmit} className="login-form">
                <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    required
                    type="text"
                    className="login-form"
                >
                </input>
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                    type="email"
                >
                </input>
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                    type="password">
                </input>
                <input
                    value={confirmPw}
                    onChange={(e) => setConfirmPw(e.target.value)}
                    placeholder="Confirm password"
                    required
                    type="password">
                </input>
                <button type="submit" className="light-button">Sign up!</button>
                <button type="button" className="dark-button" onClick={demoUser}>Demo User</button>
            </form>
        </div>)
}

export default RegisterForm;
