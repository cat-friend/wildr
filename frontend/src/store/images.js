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

export const getImages = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/images/${id}`);
    if (response.ok) {
        const image = await response.json();
        dispatch(addOneImage(image));
    }
}

export const getOneImage = () => async (dispatch) => {
    const response = await csrfFetch('/api/images');
    console.log("response", response)
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
