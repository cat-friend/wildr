import { csrfFetch } from "./csrf";

const COLLECTIONS_LOAD = 'wildr/collections/LOAD'
const COLLECTIONS_ADD = 'wildr/collections/ADD'
const COLLECTIONS_DELETE_ONE = 'wildr/collections/DELETE_ONE'
const COLLECTIONS_DELETE_IMAGE = 'wildr/collections/DELETE_IMAGE'
const COLLECTIONS_ADD_IMAGE = 'wildr/collections/ADD_IMAGE'

const load = collections => ({
    type: COLLECTIONS_LOAD,
    collections
})

const addOneCollection = collection => ({
    type: COLLECTIONS_ADD,
    collection
});

const deleteOneCollection = collection => ({
    type: COLLECTIONS_DELETE_ONE,
    collection
})

const deleteOneImageFromCollection = imageId => ({
    type: COLLECTIONS_DELETE_IMAGE,
    imageId
});

const addImageToCollection = image => ({
    type: COLLECTIONS_ADD_IMAGE,
    image
});

export const loadCollections = (userId) => async (dispatch) => {
    const response = await csrfFetch(`/api/users/${userId}/collections`);
    const collections = response.json();
    if (response.ok) {
        dispatch(load(collections))
    }
    console.log("collections from BE", collections);
    return collections;
}

export const loadOneCollection = (collectionId) => async (dispatch) => {
    const response = await csrfFetch(`/api/collections/${collectionId}`);
    const collection = response.json();
    if (response.ok) {
        dispatch(addOneCollection(collection));
    }
    return collection
}

export const createCollection = (payload) => async (dispatch) => {
    const response = await csrfFetch(`/api/collections`,
        { method: 'POST', body: JSON.stringify(payload) });
    const collection = await response.json();
    if (response.ok) {
        dispatch(addOneCollection(collection));
    }
    return collection;
}


export const editCollection = (payload) => async (dispatch) => {
    const response = await csrfFetch(`/api/collections/${payload.collectionId}`,
        { method: 'PUT', body: JSON.stringify(payload) });
    const collection = await response.json();
    if (response.ok) {
        dispatch(addOneCollection(collection));
    }
    return collection;
};

export const addToCollection = (payload) => async (dispatch) => {
    const response = await csrfFetch(`/api/collections/${payload.collectionId}`,
        { method: 'POST', body: JSON.stringify(payload) });
    const image = await response.json();
    if (response.ok) {
        dispatch(addImageToCollection(image));
    }
    return image;
};

export const deleteFromCollection = (payload) => async (dispatch) => {
    const response = await csrfFetch(`/api/collections/${payload.collectionId}/${payload.imageId}`,
        { method: 'DELETE', body: JSON.stringify(payload) });
    const collection = await response.json();
    if (response.ok) {
        dispatch(deleteOneImageFromCollection(payload.imageId));
    }
    return collection;
};

export const deleteCollection = (payload) => async (dispatch) => {
    const response = await csrfFetch(`/api/collections/${payload.collectionId}`);
    if (response.ok) {
        const delCollection = await csrfFetch(`/api/collections/${payload.collectionId}`,
            { method: 'DELETE', body: JSON.stringify(payload) });
        const collection = await delCollection.json();
        if (delCollection.ok) {
            dispatch(deleteOneCollection(collection));
            return;
        }
        return collection;
    }
    return response.json();
}

const collectionsReducer = (state = {}, action) => {
    switch (action.type) {
        case COLLECTIONS_LOAD: {
            const newState = { ...action.collections };
            return newState;
        }
        case COLLECTIONS_ADD: {
            const newState = { ...state };
            newState[action.collections.id] = action.collections.id;
            return newState;
        }
        case COLLECTIONS_DELETE_ONE: {
            const newState = { ...state };
            delete newState[action.collections.id];
        }
        case COLLECTIONS_ADD_IMAGE: {
            const newState = { ...state };
            newState[action.image.id] = action.image;
            return newState;
        }
        case COLLECTIONS_DELETE_IMAGE: {
            const newState = { ...state };
            delete newState[action.imageId];
            return newState;
        }
        default: return state;
    }
};

export default collectionsReducer;
