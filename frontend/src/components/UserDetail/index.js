import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { NavLink, Redirect, } from "react-router-dom";
import EditProfileFormModal from "../UserPageModal";

const UserDetailPage = () => {
    const { userId } = useParams();
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [albums, setAlbums] = useState(useSelector(state => state.session.albums));
    const [photostream, setPhotostream] = useState(useSelector(state => state.session.photostream));
    const [description, setDescription] = useState(description);

    useEffect(() => {
        dispatch(userActions.getOneUser(userId));
    }, [userId, dispatch]);

    const user = useSelector(state => state.users[userId]);

    const userId = user?.userId;
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
                        <h2>{user.username}</h2>
                        <div className="buttons">
                            {sessionUser.id === userId &&
                                <><EditProfileFormModal modalData={modalData} /></>}
                        </div>
                        <div>
                            <img src={image?.url} alt={image?.title} className="image-detail" />
                        </div>
                        <h3>Description</h3>
                        <div>{user.description}</div>
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
    return (profileContent);

}

export default UserDetailPage;
