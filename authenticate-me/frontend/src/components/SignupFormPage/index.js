import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from '../../store/session'
import { Redirect } from "react-router-dom";

export const SignUpFormPage = () => {
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

    const onSubmit = (e) => {

        e.preventDefault();
        setErrors([]);
        const payload = { username, email, confirmPw, password };
        if (confirmPw !== password) {
            errors.push("Password and confirm password must match.");
            return;
        }
        return dispatch(sessionActions.login(payload))
            .catch(async (response) => {
                const data = await response.json();
                if (data && data.errors) data.errors.forEach(error => {
                    errors.push(error);
                });;
            });
    }


    return (<>
        <form onSubmit={onSubmit}>
            <ul>
                {errors.map((error, i) => <li key={i}>{error}</li>)}
            </ul>
            <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
                type="text"
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
            <button type="submit">Log In</button>
        </form>
    </>)
}
