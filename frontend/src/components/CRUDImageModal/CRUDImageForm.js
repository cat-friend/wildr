import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as imageActions from "../../store/images";

function CRUDImageForm({ formData }) {
    const { action, image } = formData;
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const currImages = useSelector(state => state.images);
    let currImage = {};
    if (image) currImage = currImages[image.id]
    else {
        currImage.title = "";
        currImage.url = "";
        currImage.description = "";
    }
    const [title, setTitle] = useState(currImage.title);
    const [url, setUrl] = useState(currImage.url);
    const [description, setDescription] = useState(currImage.description);
    const [errors, setErrors] = useState([]);
    const [success, setSuccess] = useState("");

    useEffect(() => {
        if (image) dispatch(imageActions.getOneImage(image.id));
        return () => { if (image) dispatch(imageActions.getOneImage(image.id)); }
    }, [image, dispatch]);

    const submitEdit = async (e) => {
        e.preventDefault();
        setErrors([]);
        if (sessionUser.id !== currImage.userId) {
            window.alert("You are not authorized to perform this action");
            setTimeout(() => {
                window.location.reload(true);
            }, 1500);
            return;
        }
        const payload = {
            imageId: currImage.id,
            title,
            url,
            description,
            userId: sessionUser.id
        }

        return dispatch(imageActions.editImage(payload))
            .then(
                (data) => {
                    setSuccess("Success!");
                    setTimeout(() => {
                        window.location.replace(`/images/${data.id}`);
                    }, 1500);
                }, async (response) => {
                    const data = await response.json();
                    if (data && data.errors) setErrors(data.errors);
                }
            );
    }

    const submitDelete = () => {
        if (!sessionUser.id === currImage.userId) {
            window.alert("You are not authorized to perform this action");
            setTimeout(() => {
                window.location.reload(true);
            }, 1500);
            return;
        }
        const payload = {
            id: currImage.id,
            userId: sessionUser.id
        }

        return dispatch(imageActions.deleteImage(payload))
            .then(
                () => {
                    setSuccess("Success!");
                    setTimeout(() => {
                        window.location.replace(`/images`);
                    }, 1500);
                },
                async (response) => {
                    const data = await response.json();
                    if (data && data.errors) setErrors(data.errors);
                }
            );
    }

    const submitCreate = (e) => {
        e.preventDefault();
        setErrors([]);
        if (!sessionUser.id) {
            window.alert("You are not authorized to perform this action");
            setTimeout(() => {
                window.location.replace('/')
            }, 1500);
            return;
        }
        const payload = {
            title,
            url,
            description,
            userId: sessionUser.id
        }
        return dispatch(imageActions.createImage(payload))
            .then(
                (data) => {
                    setSuccess("Success!");
                    setTimeout(() => {
                        window.location.replace(`/images/${data.id}`);
                    }, 1500);
                }, async (response) => {
                    const data = await response.json();
                    if (data && data.errors) setErrors(data.errors);
                }
            );
    }

    let modalContent = null;
    // if action = create, edit, delete --> generate appropriate CRUD form
    switch (action) {
        case "Edit": {
            modalContent = (<><h1>Edit {currImage.title}</h1>
                <h2>Preview</h2>
                <div className="modal-image"><img src={url} /></div>
                <form onSubmit={() => submitEdit()}>
                    <div><label htmlFor="title">Title:</label></div>
                    <input
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required />
                    <div><label htmlFor="url">Image URL:</label></div>
                    <input
                        id="url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        required />
                    <div><label htmlFor="description">Description:</label></div>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="(Optional)" />
                    <button type="submit" className="dark-button">Submit</button>
                    <button onClick={(e) => window.location.reload(true)} type="button" className="light-button">Cancel</button>
                </form></>
            )
            break;
        }
        case "Delete": {
            modalContent = (<><h2>Are you sure you want to delete this image?</h2>
                <h3>This cannot be undone.</h3>
                <button type="button" onClick={(e) => submitDelete()} className="dark-button">Yes</button>
                <button type="button" onClick={(e) => window.location.reload(true)} className="light-button">No</button>
            </>)
            break;
        }
        case "Upload Image": {
            modalContent = (<><h1>Upload New Image</h1>
                <h2>Preview</h2>
                <div className="modal-image"><img src={url} alt={title} /></div>
                <form onSubmit={submitCreate}>
                    <label htmlFor="title">Title:</label>
                    <input
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required />
                    <label htmlFor="url">Image URL:</label>
                    <input
                        id="url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        required />
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="(Optional)" />
                    <button type="submit" className="dark-button">Submit</button>
                    <button onClick={(e) => window.location.reload(true)} type="button" className="light-button">Cancel</button>
                </form>
            </>)
            break;
        }
        default: break;
    }
    return (<>{modalContent}
        <ul className="error-list">
            {errors.map((error, i) => <li key={i} className="errors">{error}</li>)}
        </ul>
        <h2>{success}</h2>
    </>
    );
}

export default CRUDImageForm;
