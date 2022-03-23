import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as collectionActions from "../../store/collection";

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
            curr_user_id: currUserId,
            collectionId: collectionId
        }
        return dispatch(collectionActions.deleteClan(payload))
            .then(
                (response) => {
                    if (response.errors) {
                        setErrors(response.errors)
                        return
                    }
                    else {
                        setSuccess("Success!");
                        setTimeout(() => {
                            setShowModal(false);
                            dispatch(collectionActions.deleteCollection(collection))
                            history.push(`/users/${currUserId}/collections`)
                        }, 750);
                        return;
                    }
                }
            );
    };

    return (
        <>
            <div className="header-parent">
                <div className="left-corner"></div>
                <div className="header-child"><h2>Delete {`${collection.title}`}?!</h2></div>
                <div className="right-corner"></div>
            </div>
            <div className="content-container">
                <div className="content">
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
                </div>
            </div>
        </>)
}

export default CollectionDeleteForm;