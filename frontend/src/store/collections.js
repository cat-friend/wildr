import { csrfFetch } from "./csrf";

const COLLECTIONS_LOAD = 'wildr/collections/LOAD'
const COLLECTIONS_ADD = 'wildr/collections/ADD'
const COLLECTIONS_DELETE_ONE = 'wildr/collections/DELETE_ONE'

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

export const loadCollections = (userId) => async (dispatch) => {
    const response = await csrfFetch(`/api/users/${userId}/collections`);
    const collections = response.json();
    if (response.ok) {
        dispatch(load(collections))
    }
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
    const collection = await response.json();
    if (response.ok) {
        dispatch(loadOneCollection(payload.collectionId))
        return;
    }
    return collection;
};

export const deleteFromCollection = (payload) => async (dispatch) => {
    const response = await csrfFetch(`/api/collections/${payload.collectionId}`,
        { method: 'DELETE', body: JSON.stringify(payload) });
    const collection = await response.json();
    if (response.ok) {
        dispatch(loadOneCollection(payload.collectionId))
        return;
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
        default: return state;
    }
};

export default collectionsReducer;
