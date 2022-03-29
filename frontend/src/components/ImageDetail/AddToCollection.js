import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';
import * as collectionActions from "../../store/collections";
import "./AddToCollection.css"

function AddToCollection({ imageId }) {
    const userId = useSelector(state => state.session.user.id);
    const [collection, setCollection] = useState(undefined);
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
        setErrors([]);
        if (!collection) {
            setErrors(["Please choose a collection."])
            return;
        }
        const payload = {
            collectionId: collection,
            userId,
            imageId
        }
        return dispatch(collectionActions.addToCollection(payload))
            .then(() => {
                setShowSuccess(true);
                setTimeout(() => {
                    setShowSuccess(false);
                    setShowAddToCollection(false);
                }, 750);
            }, async (response) => {
                const data = await response.json();
                if (data && data.errors) setErrors(data.errors);
            })
    }

    let selectionOptions;
    if (Object.values(collections)) {
        selectionOptions = Object.values(collections).map((collection) => {
            return {
                value: collection.id,
                text: collection.title
            }
        });
    }
    return selectionOptions ? (showAddToCollection ?
        <div><ul className="error-list">
            {errors.map((error, i) => <li key={i} className="errors">{error}</li>)}
        </ul>
            {showSuccess && <h2>Successfully added!</h2>}
            <form onSubmit={(e) => handleSubmit(e)}>
                <select
                    name="collection"
                    id="adding-to-collection"
                    onChange={(e) => setCollection(e.target.value)}
                    value={collection}
                >
                    <option value={null}>--Choose a collection--</option>
                    {selectionOptions.map((ele, i) => {
                        return <option key={i} value={ele.value}>{`${ele.text}`}</option>
                    })}
                </select>
                <button type="submit" className="dark-button collection">Add</button>
                <button type="button" className="light-button collection" onClick={() => setShowAddToCollection(false)}>Cancel</button>
            </form ></div > :
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
