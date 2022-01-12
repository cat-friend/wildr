import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { NavLink, Redirect, } from "react-router-dom";
import * as imageActions from "../../store/images";
import * as userActions from "../../store/images";
import CRUDImageFormModal from "../EditImageModal";

const ImageDetailPage = () => {
    const { imageId } = useParams();
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

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

    const userId = image?.userId;
    const modalData = {
        crudAction: "edit/delete",
        imageId
    }

    // onClick edit button:  show EditModal
    // onClick delete button: show DeleteModal
    return (
        <>
            <div className="image-details-container">
                <div className="image">
                    <img src={image?.url} />
                </div>
                <div className="details">
                    <h2>{image?.title}</h2>
                    <p>{image?.description}</p>
                </div>
                <div className="buttons">
                    {sessionUser.id === userId &&
                        <><CRUDImageFormModal modalData={modalData}/></>}
                </div>
            </div>
        </>
    );

}

export default ImageDetailPage;
