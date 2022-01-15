import { csrfFetch } from "./csrf"

const LOAD = 'wildr/user/LOAD';

const load = user => ({
    type: LOAD,
    user
});

export const getOneUser = (userId) => async (dispatch) => {
    const response = await csrfFetch(`/api/users/${userId}`);
    if (response.ok) {
        const user = await response.json();
        dispatch(load(user));
    }
};

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
