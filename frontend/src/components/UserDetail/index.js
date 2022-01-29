import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { NavLink, Redirect, } from "react-router-dom";
import EditProfileFormModal from "../UserPageModal";
import * as profileActions from "../../store/profiles"
import * as userActions from "../../store/users";

const UserDetailPage = () => {
    const { profileId } = useParams();
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const { profile, user, userIcon } = useSelector(state => state.user);
    console.log("user", user);

    // const [albums, setAlbums] = useState(useSelector(state => state.session.albums));
    // const [photostream, setPhotostream] = useState(useSelector(state => state.photostream));
    const [description, setDescription] = useState(profile.description);
    const [username, setUsername] = useState(user.username);

    useEffect(() => {
        dispatch(userActions.getOneUser(profileId));
    }, [profileId, dispatch]);


    const modalData = {
        user
    }

    let profileContent;

    if (!sessionUser) {
        profileContent = (<>
            <h1>You are not authorized to view this page</h1>
            <h2>Please register or log in.</h2>
        </>
        )
    }
    else {
        if (sessionUser) {
            profileContent = (<>
                <div className="details-container">
                    <div className="profile-info">
                        <h2>{user?.username}</h2>
                        <div className="buttons">
                            {sessionUser.id === user.id &&
                                <><EditProfileFormModal modalData={modalData} /></>}
                        </div>
                        <div>
                            <img src={userIcon?.url} alt={`User icon for ${user?.username}`} className="image-detail" />
                        </div>
                        <h3>Description</h3>
                        <div>{profile?.description}</div>
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
    }
    return profileContent;

}

export default UserDetailPage;
