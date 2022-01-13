import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as imageActions from "../../store/images";

function CRUDImageForm({ formData }) {
    const history = useHistory();
    const { action, image } = formData;
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const currImage = useSelector(state => state.images[image.id]);
    const [title, setTitle] = useState(currImage.title || "");
    const [url, setUrl] = useState(currImage.url || "");
    const [description, setDescription] = useState(currImage.description || "");
    const [errors, setErrors] = useState([]);
    // const sessionUser = useSelector(state => state.session.user);

    const submitEdit = async (e) => {
        e.preventDefault();
        setErrors([]);
        if (!sessionUser.id === currImage.userId) {
            window.alert("You are not authorized to perform this action");
            setTimeout(() => {
                window.location.reload(true);
            }, 5000);
            return;
        }
        const payload = {
            id: currImage.id,
            title,
            url,
            description,
            userId: sessionUser.id
        }
        // send payload to store, from there store goes to fetch
        dispatch(imageActions.editImage(payload))
            .catch(async (response) => {
                const data = await response.json();
                if (data && data.errors) setErrors(data.errors);
                return;
            });
        if (errors.length <= 0) window.location.reload(true);
    }

    const submitDelete = () => {
        if (!sessionUser.id === currImage.userId) {
            window.alert("You are not authorized to perform this action");
            setTimeout(() => {
                window.location.reload(true);
            }, 5000);
            return;
        }
        const payload = {
            imageId: currImage.id,
            userId: sessionUser.id
        }
        console.log(payload);

        // send payload to store, from there store goes to fetch


    }

    const submitCreate = (e) => {
        if (!sessionUser.id) {
            window.alert("You are not authorized to perform this action");
            setTimeout(() => {
                history.push('/')
            }, 5000);
            return;
        }
        const payload = {
            title,
            url,
            description,
            userId: sessionUser.id
        }
        return dispatch(imageActions.createImage(payload))
            .catch(async (response) => {
                const data = await response.json();
                if (data && data.errors) setErrors(data.errors);
            })
    }



    useEffect(() => {
        dispatch(imageActions.getOneImage(image.id));
    }, [image.id, dispatch]);

    let modalContent = null;
    // if action = create, edit, delete --> generate appropriate CRUD form
    switch (action) {
        case "Edit": {
            modalContent = (<><h1>Edit</h1>
                <h2>Preview</h2>
                <div className="modal-image"><img src={url} /></div>
                <form onSubmit={submitEdit}>
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
                    <button type="submit">Submit</button>
                    <button onClick={(e) => window.location.reload(true)} type="button">Cancel</button>
                </form></>
            )
            break;
        }
        case "Delete": {
            modalContent = (<><h2>Are you sure you want to delete this image?</h2>
                <h3>This cannot be undone.</h3>
                <button type="button" onClick={(e) => submitDelete}>Yes</button>
                <button type="button" onClick={(e) => window.location.reload(true)}>No</button>
            </>)
            break;
        }
        case "Upload Image": {
            modalContent = (<><h1>create</h1>
                <h2>Preview</h2>
                <div className="modal-image"><img src={url} /></div>
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
                    <button type="submit">Submit</button>
                    <button onClick={(e) => window.location.reload(true)} type="button">Cancel</button>
                </form>
            </>)
            break;
        }
        default: break;
    }
    return (<>{modalContent}
        <ul>
            {errors.map((error, i) => <li key={i}>{error}</li>)}
        </ul>
    </>
    );
}

export default CRUDImageForm;
