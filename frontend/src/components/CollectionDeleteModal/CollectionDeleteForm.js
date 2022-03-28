import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as collectionActions from "../../store/collections";

function CollectionDeleteForm({ setShowModal, collection }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { collectionId } = useParams();
    const currUserId = useSelector(state => state.session.user.id);
    const [showSuccess, setShowSuccess] = useState(false);
    const [errors, setErrors] = useState([]);


    const submitDelete = () => {
        setErrors([]);
        const payload = {
            currUserId,
            collectionId
        }
        return dispatch(collectionActions.deleteCollection(payload))
            .then(() => {
                setShowSuccess(true);
                setTimeout(() => {
                    setShowModal(false);
                    history.push(`/users/${currUserId}/collections`)
                }, 750);
            },
                async (response) => {
                    const data = await response.json();
                    if (data && data.errors) setErrors(data.errors);
                }
            );
    };

    return (
        <div>
            <h2>Delete "{`${collection.title}`}"?!</h2>
            {showSuccess && (<h2 className="success">Success!</h2>)}
            <h3>Are you sure you want to delete this collection?</h3>
            This cannot be undone and it won't delete the images contained within the collection, only the collection itself.
            <ul className="error-list">
                {errors.map((error, idx) => (
                    <p key={idx} className="errors">{error}</p>
                ))}
            </ul>
            <div className="button-div">
                <button type="button" onClick={() => submitDelete()} className="">Yes, delete it!!</button>
                <button type="button" onClick={() => setShowModal(false)} className="">Not today</button>
            </div>
        </div>)
}

export default CollectionDeleteForm;
