import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";

function LoginForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  return (
    <div className="login-form">
      <ul className="error-list">
        {errors.map((error, idx) => (
          <li key={idx} className="errors">{error}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
          placeholder="Username or Email"
          className="login-form"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Password"
        />
        <button type="submit" className="light-button">Log In</button>
        <button type="button" className="dark-button" onClick={demoUser}>Demo User</button>
      </form>
    </div>
  );
}

export default LoginForm;
