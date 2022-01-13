import { csrfFetch } from "./csrf";

const LOAD = 'wildr/image/LOAD';
const ADD_IMAGE = 'wildr/image/ADD_IMAGE';
const DELETE_IMAGE = 'wildr/image/DELETE_IMAGE'

const load = list => ({
    type: LOAD,
    list
});

const addOneImage = image => ({
    type: ADD_IMAGE,
    image
});

const deleteOneImage = image => ({
    type: DELETE_IMAGE,
    image
})

export const getImages = () => async (dispatch) => {
    const response = await csrfFetch('/api/images');
    if (response.ok) {
        const list = await response.json();
        dispatch(load(list));
    }
}

export const getOneImage = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/images/${id}`);
    console.log("hit the getOneImage function");
    if (response.ok) {
        const image = await response.json();
        dispatch(addOneImage(image));
        return image;
    }
}

export const deleteImage = (payload) => async (dispatch) => {
    const response = await csrfFetch(`/api/images/${payload.imageId}`,
        { method: 'DELETE', body: JSON.stringify(payload) });
    if (response.ok) {
        const image = await response.json();
        dispatch(deleteOneImage(image));
        return payload;
    }
}

export const createImage = (payload) => async (dispatch) => {
    const response = await csrfFetch(`/api/images`,
        { method: 'POST', body: JSON.stringify(payload) });
    if (response.ok) {
        const image = await response.json();
        dispatch(addOneImage(image));
        return image;
    }
}

export const editImage = (payload) => async (dispatch) => {
    const response = await csrfFetch(`/api/images/${payload.imageId}`,
        { method: 'PUT', body: JSON.stringify(payload) });

    const image = await response.json();
    if (response.ok) {
        dispatch(addOneImage(image));
    }
    return image;
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
        case ADD_IMAGE: {
            const newImage = { ...state };
            newImage[action.image.id] = action.image;
            return { ...newImage };
        }
        case DELETE_IMAGE: {
            const allImages = { ...state };
            delete allImages[action.image.id];
            return state;
        }
        default: return state;
    }
}

export default imageReducer;
