import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function EditProfileForm({ user }) {
    const { id, description } = user;
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [newDescription, setDescription] = useState(description);
    // const [icon, setIcon] = useState(state => state.session.profile.icon);
    // const [albums, setAlbums] = useState(useSelector(state => state.session.albums));
    // const [photostream, setPhotostream] = useState(useSelector(state => state.session.photostream));
    const [errors, setErrors] = useState([]);
    const [success, setSuccess] = useState("");

    useEffect(() => {
        dispatchEvent(userActions.getOneUser(user.id));
    }, [user.id, dispatch])

    const editForm = (
        <><ul className="error-list">
            {errors.map((error, i) => <li key={i} className="errors">{error}</li>)}
        </ul>
            <h2>{success}</h2>

            <form onSubmit={submitCreate}>
                <label htmlFor="url">Profile Icon:</label>
                <input
                    id="icon"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    required />
                <label htmlFor="description">Description:</label>
                <textarea
                    id="description"
                    value={newDescription}
                    onChange={(e) => setDescription(e.target.value)}
                    required />
                <button type="submit" className="dark-button">Submit</button>
                <button onClick={(e) => window.location.reload(true)} type="button" className="light-button">Cancel</button>

            </form>
        </>
    )

    const profilePreview = (<>
        <div className="details-container">
            <div className="profile-info">
                <div className="profile-header">
                    <h2>{sessionUser.username} - Profile Preview</h2>
                    <div className="buttons">
                        {sessionUser.id === id &&
                            <><EditProfileFormModal modalData={modalData} /></>}
                    </div>
                </div>
                <div className="profile-body">
                    <div>
                        <img src={image?.url} alt={image?.title} className="image-detail" />
                    </div>
                    <div>
                        {newDescription}
                    </div>
                </div>
            </div>
            <div className="details">
                <div>
                    Albums
                </div>
                <div>
                    Photostream
                </div>
            </div>
        </div>
    </>)
    const unauthorized = (<>
        <h1>You are not authorized to view this page</h1>
        <h2>Please register or log in.</h2>
    </>)
    if (sessionUser.id !== id) {
        return unauthorized;
    }
    return (profilePreview, editForm);

}

export default EditProfileForm;
