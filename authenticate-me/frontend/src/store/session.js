import { csrfFetch } from "./csrf"






// make two pojo action creators -
// types should be extracted as a constant and used by the action creator
// and the session reducer

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
        dispatch(setLogin(user));
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

const initialState = { user: null };

// 1. set the session user in the session slice of state to the action creator's input parameter
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

// 2. removes the session user

export default sessionReducer;
