import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { NavLink, Redirect, } from "react-router-dom";
import EditProfileFormModal from "../UserPageModal";
import * as userActions from "../../store/users";

const UserDetailPage = () => {
    const { userId } = useParams();
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const user  = useSelector(state => state.user);
    const userIcon = user?.UserIcon

    // const [collections, setCollections] = useState(useSelector(state => state.session.collections));
    // const [photostream, setPhotostream] = useState(useSelector(state => state.photostream));


    useEffect(() => {
        dispatch(userActions.getOneUser(userId));
    }, [userId, dispatch]);

    let profileContent;

    if (!sessionUser) {
        profileContent = (<>
            <h1>You are not authorized to view this page</h1>
            <h2>Please register or log in.</h2>
        </>
        )
    }
    else {
        profileContent = (<>
            <div className="details-container">
                <div className="profile-info">
                    <h2>{user?.username}</h2>
                    <div className="buttons">
                        {sessionUser?.id === user?.id &&
                            <><EditProfileFormModal /></>}
                    </div>
                    <div>
                        <img src={userIcon?.url} alt={`User icon for ${user?.username}`} className="image-detail" />
                    </div>
                    <h3>Description</h3>
                    <div>{user?.description}</div>
                </div>
                <div className="details">

                    <div>
                        <h2>
                        Collections
                        </h2>
                    </div>
                    <div><h2>
                        Photostream
                        </h2>
                    </div>
                </div>
            </div>
        </>);
    }
    return profileContent;
}

export default UserDetailPage;
