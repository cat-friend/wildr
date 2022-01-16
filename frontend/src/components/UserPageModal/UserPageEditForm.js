import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function EditProfileForm({ user }) {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [username, setUsername] = useState("");
    const [description, setDescription] = useState("");
    const [albums, setAlbums] = useState("");
    const [photostream, setPhotostream] = useState("");

    useEffect(() => {
        dispatchEvent(userActions.getOneUser(user.id));
    }, [user.id, dispatch])

    let editForm;
    if (sessionUser.id === userId) {
        editForm = (<>
            <div className="details-container">
                <div className="profile-info">
                    <h2></h2>
                    <div className="buttons">
                        {sessionUser.id === userId &&
                            <><EditProfileFormModal modalData={modalData} /></>}
                    </div>
                    <img src={image?.url} alt={image?.title} className="image-detail" />
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
        </>);
    }

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
}

export default EditProfileForm;
