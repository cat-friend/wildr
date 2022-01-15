import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { NavLink, Redirect, } from "react-router-dom";
import * as imageActions from "../../store/images";
import CRUDImageFormModal from "../EditImageModal";

const UserDetailPage = () => {
    const { userId } = useParams();
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(imageActions.getOneUser(userId));
    }, [userId, dispatch]);

    const image = useSelector(state => state.images[userId]);

    const userId = image?.userId;
    const modalData = {
        crudAction: "edit/delete",
        userId
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
        if (sessionUser.id === userId) {
            profileContent = (<>
                <div className="details-container">
                    <div className="profile-info">
                        <h2></h2>
                        <div className="buttons">
                            {sessionUser.id === userId &&
                                <><CRUDImageFormModal modalData={modalData} /></>}
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
    }
    return (profileContent);

}

export default UserDetailPage;
