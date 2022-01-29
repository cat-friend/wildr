import { csrfFetch } from "./csrf"

const LOAD = 'wildr/user/LOAD';
const PUT = 'wildr/user/PUT'


const load = user => ({
    type: LOAD,
    user
});

const put = user => ({
    type: PUT,
    user
});

export const getOneUser = (userId) => async (dispatch) => {
    const response = await csrfFetch(`/api/users/${userId}`);
    if (response.ok) {
        const user = await response.json();
        dispatch(load(user));
    }
};

export const updateUser = (payload) => async (dispatch) => {
    const response = await csrfFetch(`/api/users/${payload.id}`,
        {
            method: 'PUT',
            body: JSON.stringify(payload)
        });
    if (response.ok) {
        const user = await response.json();
        dispatch(put(user));
    }
}

const userReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD: {
            const user = { ...action.user };
            return user;
        }
        case PUT: {
            const user = { ...action.user };
            return user;
        }
        default: return state;
    }
};

export default userReducer;
