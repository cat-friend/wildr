import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as collectionActions from "../../store/collections";

function CollectionsEditForm({ collection, setShowEdit }) {
    const dispatch = useDispatch();
    const [title, setTitle] = useState(collection.title);
    const [errors, setErrors] = useState([]);
    const [showSuccess, setShowSuccess] = useState(false);
    const userId = useSelector(state => state.session.user.id);

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            userId,
            title,
            collectionId: collection.id
        }
        return dispatch(collectionActions.editCollection(payload))
            .then(
                (data) => {
                    if (data && data.errors) {
                        setErrors(data.errors);
                        return;
                    };
                    setShowSuccess(true);
                    setTimeout(() => {
                        setShowSuccess(false);
                        setShowEdit(false);
                    }, 750);

                })
    }

    return (
        <div className="">
            <ul className="error-list">
                {errors.map((error, i) => <li key={i} className="errors">{error}</li>)}
            </ul>
            {showSuccess && <h2>Success!</h2>}
            <form onSubmit={(e) => handleSubmit(e)}>
                <input
                    type="text"
                    value={title}
                    placeholder="Title of collection"
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <button
                    type="submit"
                    className="">
                    SUBMIT
                </button>
                <button
                    type="button"
                    onClick={() => {
                        setTitle(collection.title);
                        setShowEdit(false);
                    }}
                    className="">
                    CANCEL
                </button>
            </form>
        </div>
    )
}

export default CollectionsEditForm;
