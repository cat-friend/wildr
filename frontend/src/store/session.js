import { csrfFetch } from "./csrf"

const LOGIN_USER = 'wildr/session/LOGIN_USER'
const LOGOUT_USER = 'wildr/session/LOGOUT_USER'

const setLogin = (user) => {
    return {
        type: LOGIN_USER,
        user
    }
}

const setLogout = () => {
    return {
        type: LOGOUT_USER,
        user: null
    }
}

// thunk for logging in; payload must have body
// with a key of credential (email/un) and a key of pw
export const login = (payload) => async (dispatch) => {
    const { credential, password } = payload;
    const response = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify({ credential, password })
    })
    if (response.ok) {
        const user = await response.json();
        dispatch(setLogin(user.user));
        return user;
    }
}

export const logout = () => async (dispatch) => {
    const response = await csrfFetch('/api/session', {
        method: 'DELETE'
    });
    if (response.ok) {
        dispatch(setLogout());
        return response;
    }
}

export const sessionRestore = () => async (dispatch) => {
    const response = await csrfFetch('/api/session');
    const user = await response.json();
    dispatch(setLogin(user.user))
    return response;
}

export const signup = (payload) => async (dispatch) => {
    const { username, email, password } = payload
    const response = await csrfFetch(`/api/users`,
        {
            method: 'POST',
            body: JSON.stringify({ username, email, password })
        });
    const user = await response.json();
    console.log("user", user);
    if (response.ok) {
        dispatch(setLogin(user.user));
    }
    return user;
}

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_USER: {
            const newState = Object.assign({}, state);
            newState.user = action.user;
            return newState;
        }
        case LOGOUT_USER: {
            const newState = Object.assign({}, state);
            newState.user = null;
            return newState;
        }
        default: return state;

    }
}

export default sessionReducer;
