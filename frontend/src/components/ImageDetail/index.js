import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { NavLink, Redirect, } from "react-router-dom";
import * as imageActions from "../../store/images";
import * as userActions from "../../store/images";

const ImageDetailPage = () => {
    const { imageId } = useParams();
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [showEditButton, setShowEditButton] = useState(false);
    const [showDeleteButton, setShowDeleteButton] = useState(false);
    useEffect(() => {
        dispatch(imageActions.getOneImage(imageId));
        // consider moving if et al to return expression

    }, [imageId, dispatch]);

    const image = useSelector(state => state.images[imageId]);

    if (!image) {
        return (
            <><h1>Image Not Found.</h1>
                <NavLink to="/images">Return to Image Browser</NavLink>
            </>
        )
    }

    const userId = image.userId;
    if (userId && sessionUser.id === userId) {
        // setShowEditButton(true);
        // setShowDeleteButton(true);
    }

    // ideal - get userId from image, then find user - grab username, display username
    // set useEffect to listen to sessionuser (since ppl can log in with a modal)
    // if (sessionUser && sessionUser.id = userId of image) display edit button
    // get userId for imageId; if userId === sessionUser.id then show delete buttton


    return (
        <>
            <div className="image-details-container">
                <div className="image">
                    <img src={image.url}/>
                </div>
                <div className="details">
                    <h2>{image.title}</h2>
                    <p>{image.description}</p>
                </div>
            </div>
        </>
    );

}

export default ImageDetailPage;
