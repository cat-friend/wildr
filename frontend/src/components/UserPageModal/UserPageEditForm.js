import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as userActions from "../../store/users";
import { getAllUserIcons } from "../../store/user-icons";

function EditProfileForm({ modalData }) {
    console.log("modalData user", modalData)
    const user = useSelector(state => state.user);
    const allIcons = useSelector(state => Object.values(state.icons));
    console.log("allIcons", allIcons)
    const { description, id } = user
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [newDescription, setNewDescription] = useState(description);
    const [iconId, setIcon] = useState(user.userIconId);
    const [iconUrl, setIconUrl] = useState(user.UserIcon.url)
    const [errors, setErrors] = useState([]);
    const [success, setSuccess] = useState("");


    useEffect(() => {
        dispatch(userActions.getOneUser(id));
        dispatch(getAllUserIcons());
    }, [user.id, dispatch])

    const onSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        if (sessionUser.id !== id) {
            window.alert("You are not authorized to perform this action");
            setTimeout(() => {
                window.location.reload(true);
            }, 1500);
            return;
        }
        const payload = {
            id,
            userIconId: iconId,
            description: newDescription
        }
        return dispatch(userActions.updateUser(payload))
            .then(
                (data) => {
                    setSuccess("Success!");
                    setTimeout(() => {
                        window.location.replace(`/users/${data.user.id}`);
                    }, 1500);
                }, async (response) => {
                    const data = await response.json();
                    if (data && data.errors) setErrors(data.errors);
                }
            );
    }



    const editForm = (
        <><h2>Edit</h2><ul className="error-list">
            {errors.map((error, i) => <li key={i} className="errors">{error}</li>)}
        </ul>
            <h2>{success}</h2>

            <form onSubmit={onSubmit}>
                <label htmlFor="url">Profile Icon:</label>
                {allIcons.map((icon) => {
                    return (<>
                        <div id="icons-array">
                            <input type="radio" key={icon.id} value={icon.id} id={icon.id} /><label for={icon.id}><img src={`${icon.url}`} className="icon-preview" /></label>
                        </div>
                    </>
                    )
                })}
                {/* <input
                    id="icon"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    required /> */}
                <h3><label htmlFor="description">Description:</label></h3>
                <textarea
                    id="description"
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
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
                    <h2>Profile Preview</h2>
                </div>
                <div className="profile-body">
                    <div>
                        <h3>User Icon:</h3>
                        <img src={iconUrl} alt="A cute user icon" className="image-detail" />
                    </div>
                    <div>
                        <h3>Description:</h3>
                        {newDescription}
                    </div>
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
    return (
        <>
            <h1>{sessionUser.username}</h1>
            {profilePreview}
            {editForm}
        </>);

}

export default EditProfileForm;
