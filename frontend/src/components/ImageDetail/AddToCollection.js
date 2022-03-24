import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';
import * as collectionActions from "../../store/collections";


function AddToCollection({ imageId }) {
    const userId = useSelector(state => state.session.user.id);
    const [collection, setCollection] = useState("");
    const [showAddToCollection, setShowAddToCollection] = useState(false);
    const [errors, setErrors] = useState([]);
    const [showSuccess, setShowSuccess] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(collectionActions.loadCollections(userId));
    }, [dispatch, userId]);
    const collections = useSelector(state => (state.collections));


    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            collectionId: collection,
            userId,
            imageId
        }
        // add image to collection -- need imageId, userId
        return dispatch(collectionActions.addToCollection(payload))
            .then(() => {
                setShowSuccess(true);
                setTimeout(() => {
                    setShowSuccess(false);
                }, 750);
            }, async (response) => {
                const data = await response.json();
                if (data && data.errors) setErrors(data.errors);
            })
    }

    let selectionOptions;
    if (Object.values(collections)) {
        selectionOptions = Object.values(collections).map((collection) => {
            console.log("mapping collection", collection);
            return {
                value: collection.id,
                title: collection.title
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
                return <option key={i} value={ele.id}>{`${ele.title}`}</option>
            })}
        </select>
        <button type="submit">Add</button>
        <button type="button" onClick={() => setShowAddToCollection(false)}>Cancel</button>
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
