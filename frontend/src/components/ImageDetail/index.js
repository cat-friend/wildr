import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { NavLink, Redirect, } from "react-router-dom";
import * as imageActions from "../../store/images";
import CRUDImageFormModal from "../EditImageModal";

const ImageDetailPage = () => {
    const { imageId } = useParams();
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(imageActions.getOneImage(imageId));
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

    let imageDetailContent;

    if (!sessionUser) {
        imageDetailContent = (<>
            <h1>You are not authorized to view this page</h1>
            <h2>Please register or log in.</h2>
        </>
        )
    }
    else {
        if (sessionUser) {
            imageDetailContent = (<>
                <div className="image-details-container">
                    <div className="image">
                        <img src={image?.url} alt={image?.title} className="image-detail"/>
                    </div>
                    <div className="details">
                        <h2>{image?.title}</h2>
                        <p>{image?.description}</p>
                    </div>
                </div>
            </>);
        }
        if (sessionUser.id === userId) {
            imageDetailContent = (<>
                <div className="image-details-container">
                    <div className="image">
                        <img src={image?.url} className="image-detail"/>
                    </div>
                    <div className="details">
                        <h2>{image?.title}</h2>
                        <p>{image?.description}</p>
                    </div>
                    <div className="buttons">
                        {sessionUser.id === userId &&
                            <><CRUDImageFormModal modalData={modalData} /></>}
                    </div>
                </div>
            </>);
        }
    }
    return (imageDetailContent);

}

export default ImageDetailPage;
