import { csrfFetch } from "./csrf";

const COLLECTIONS_LOAD = 'wildr/collections/LOAD'
const COLLECTIONS_ADD = 'wildr/collections/ADD'
const COLLECTIONS_DELETE_ONE = 'wildr/collections/DELETE_ONE'

const collectionsLoad = collections => ({
    type: COLLECTIONS_LOAD,
    collections
})

export const loadCollections = (userId) => async (dispatch) => {
    const response = await csrfFetch(`/api/collections/users/${userId}`);
    const collections = response.json();
    if (response.ok) {
        dispatch(ssLoad(collections))
    }
    return collections;
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
