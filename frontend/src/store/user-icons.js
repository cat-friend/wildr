import { csrfFetch } from "./csrf"

const LOAD = 'wildr/icons/LOAD';

const load = icons => ({
    type: LOAD,
    icons
});

export const getAllUserIcons = () => async (dispatch) => {
    const response = await csrfFetch(`/api/userIcons`);
    const icons = await response.json();
    if (response.ok) {
        dispatch(load(icons));
        return icons;
    }

}

const iconReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD: {
            const allIcons = {};
            action.icons.forEach((icon) => {
                allIcons[icon.id] = icon;
            })
            return { ...allIcons, ...state }
        }
        default: return state;
    }
}

export default iconReducer
