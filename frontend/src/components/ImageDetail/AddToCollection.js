import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as collectionActions from "../../store/collection";


function AddToCollection({ imageId }) {
    const userId = useSelector(state => state.session.user);
    const [collection, setCollection] = useState("");
    const [showAddToCollection, setShowAddToCollection] = useState(false);
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(collectionActions.loadCollections(userId));
    }, [dispatch, userId]);
    const collections = useSelector(state => (state.collections));


    const handleSubmit = (e) => {
        e.preventDefault();
        // add image to collection -- need imageId, userId
    }

    let selectionOptions;
    if (Object.values(collections)) {
        selectionOptions = Object.values(collections).map((collection) => {
            return {
                value: collection.id,
                text: collections.title
            }
        });
    }

    return selectionOptions ? (showAddToCollection ? <form onSubmit={(e) => handleSubmit(e)}>
        <select
            name="collection"
            id="adding-to-collection"
            onChange={(e) => setCollection(e.target.value)}
            value={collection}
        >
            {selectionOptions.map((ele, i) => {
                <option key={i} value={ele.id}>{`${ele.title}`}</option>
            })}
        </select>
        <button type="submit">Add</button>
    </form> :
        <>
            <NavLink to="#" onClick={(e) => {
                e.preventDefault();
                setShowAddToCollection(true)
            }}>Add to collection</NavLink>
        </>
    ) :
        null;
}

export default AddToCollection;
