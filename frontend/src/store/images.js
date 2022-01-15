import { csrfFetch } from "./csrf";

const LOAD = 'wildr/image/LOAD';
const ADD_IMAGE = 'wildr/image/ADD_IMAGE';
const DELETE_IMAGE = 'wildr/image/DELETE_IMAGE'

const load = images => ({
    type: LOAD,
    images
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
        const images = await response.json();
        dispatch(load(images));
        return images;
    }
}

export const getOneImage = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/images/${id}`);
    const image = await response.json();
    if (response.ok) {
        dispatch(addOneImage(image));
    }
    return image;
}

export const deleteImage = (payload) => async (dispatch) => {
    const currImage = await csrfFetch(`/api/images/${payload.id}`);
    if (currImage.ok) {
        const delImg = await csrfFetch(`/api/images/${payload.id}`,
            { method: 'DELETE', body: JSON.stringify(payload) });
        if (delImg.ok) {
            const image = await currImage.json();
            dispatch(deleteOneImage(image));
            return image;
        }
        return delImg.json();
    }
    return currImage.json();
}

export const createImage = (payload) => async (dispatch) => {
    const response = await csrfFetch(`/api/images`,
        { method: 'POST', body: JSON.stringify(payload) });
    const image = await response.json();
    if (response.ok) {
        dispatch(addOneImage(image));
    }
    return image;
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
            action.images.forEach((image) => {
                allImages[image.id] = image;
            });
            return {
                ...allImages,
                ...state
            }
        }
        case ADD_IMAGE: {
            const newImage = { ...state };
            if (!state[action.image.id]) {
                newImage[action.image.id] = action.image;
                return { ...newImage };
            }
            return newImage;
        }
        case DELETE_IMAGE: {
            const allImages = { ...state };
            delete allImages[action.image.id];
            return allImages;
        }
        default: return state;
    }
}

export default imageReducer;
