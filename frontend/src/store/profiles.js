import { csrfFetch } from "./csrf";

const PROFILE_LOAD = 'wildr/profile/LOAD';

const profileLoad = profile => ({
    type: PROFILE_LOAD,
    profile
});

export const getOneProfile = (profileId) => async (dispatch) => {
    const response = await csrfFetch(`/api/users/${profileId}`);
    const profile = await response.json();
    if (response.ok) {
        dispatch(profileLoad(profile));
    }
    return profile;
}

const profileReducer = (state = {}, action) => {
    switch (action.type) {
        case PROFILE_LOAD: {
            const profile = { ...action.profile };
            return profile;
        }
        default: return state;
    }
}

export default profileReducer;
