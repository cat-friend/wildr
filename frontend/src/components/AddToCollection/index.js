import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as collectionActions from "../../store/collection";
import CreatableSelect from 'react-select/creatable'; // change to the async option
import { ActionMeta, OnChangeValue } from 'react-select';

function AddToCollection() {
    const userId = useSelector(state => state.session.user);
    const [collection, setCollection] = useState("");
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(collectionActions.loadCollections(userId));
    }, [dispatch, userId])
    const collections = useSelector(state => (state.collections));
    let selectionOptions;
    if (Object.values(collections)) {
        selectionOptions = Object.values(collections).map((collection) => {

        })
        return (
            <CreatableSelect
                isClearable
                options={selectionOptions}
                // onCreateOption={(e) =>  } send to create a new collection, then post to the collection
                onChange={(e) => setCollection(e.target.value)} />
        )
    }

}

export default AddToCollection;
