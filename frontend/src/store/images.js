import { csrfFetch } from "./csrf";

const LOAD = 'wildr/image/LOAD';
const ADD_IMAGE = 'wildr/image/ADD_IMAGE';

const load = list => ({
    type: LOAD,
    list
});

const addOneImage = image => ({
    type: ADD_IMAGE,
    image
});

export const getImages = () => async (dispatch) => {
    const response = await csrfFetch('/api/images');
    if (response.ok) {
        const list = await response.json();
        dispatch(load(list));
    }
}

const imageReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD: {
            const allImages = {};
            action.list.forEach((image) => {
                allImages[image.id] = image;
            });
            return {
                ...allImages,
                ...state
            }
        }
        default: return state;
    }
}

export default imageReducer;
