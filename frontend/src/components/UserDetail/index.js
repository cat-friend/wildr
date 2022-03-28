import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { NavLink, Redirect, } from "react-router-dom";
import EditProfileFormModal from "../UserPageModal";
import * as userActions from "../../store/users";
import { getUserImages } from "../../store/images";
import CollectionsBrowser from "../CollectionsBrowser";


const UserDetailPage = () => {
    const { userId } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(userActions.getOneUser(userId));
        dispatch(getUserImages(userId));
    }, [userId, dispatch]);
    const sessionUser = useSelector(state => state.session.user);
    const user = useSelector(state => state.user);
    const userIcon = user?.UserIcon
    const images = useSelector(state => { if (state.images) return Object.values(state.images) })



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
                        <img src={userIcon?.url} alt={`User icon for ${user?.username}`} className="user-icon" />
                    </div>
                    <h3>Description</h3>
                    <div>{user?.description}</div>
                </div>
                <div className="details">
                    <CollectionsBrowser />
                    <div className='browser'>
                        <h2>
                            Images
                        </h2>
                        <div className='images'>
                            {images.map((image) => {
                                return (
                                    <NavLink to={`/images/${image.id}`} key={image.id}><img src={image.url} key={image.id} alt={image.title} className="thumbnails" /></NavLink>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>);
    }
    return profileContent;
}

export default UserDetailPage;
