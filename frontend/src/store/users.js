import { csrfFetch } from "./csrf"

const LOAD = 'wildr/user/LOAD';
const PROFILE_LOAD = 'wildr/profile/LOAD';

const load = user => ({
    type: LOAD,
    user
});

const profileLoad = profile => ({
    type: PROFILE_LOAD,
    profile
});

export const getOneUser = (userId) => async (dispatch) => {
    const response = await csrfFetch(`/api/users/${userId}`);
    if (response.ok) {
        const user = await response.json();
        dispatch(load(user));
    }
};

export const updateUser = (payload) => async (dispatch) => {
    const response = await csrfFetch(`/api/users/`,
    {method: 'PUT', body: JSON.stringify(payload)});
    const profile = await response.json();
    if (response.ok) {
        dispatch(load(profile.user));
    }
}

const userReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD: {
            const users = {};
            action.user.forEach((user) => {
                users[user.id] = user;
            });
        }
        default: return state;
    }
};

export default userReducer;
