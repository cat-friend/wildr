import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as collectionActions from "../../store/collections";


function CreateCollectionForm({setShowCreateForm}) {
    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const [errors, setErrors] = useState([]);
    const [showSuccess, setShowSuccess] = useState(false);
    const userId = useSelector(state => state.session.user.id);

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            userId,
            title,
        }
        return dispatch(collectionActions.createCollection(payload))
            .then(() => {
                setShowSuccess(true);
                setTimeout(() => {
                    setShowSuccess(false);
                    setShowCreateForm(false);
                }, 750);
            }, async (response) => {
                const data = await response.json();
                if (data && data.errors) setErrors(data.errors);
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
                    Create
                </button>
                <button
                    type="button"
                    onClick={() => {
                        setTitle("");
                        setShowCreateForm(false);
                    }}
                    className="">
                    CANCEL
                </button>
            </form>
        </div>
    )
}

export default CreateCollectionForm;
