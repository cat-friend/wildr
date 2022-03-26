import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import * as imageActions from "../../store/images";
import CRUDImageFormModal from "../CRUDImageModal";
import AddToCollection from "./AddToCollection";
import { getOneUser } from "../../store/users"

const ImageDetailPage = () => {
    const { imageId } = useParams();
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const image = useSelector(state => state.images[imageId]);
    const userId = image?.userId;
    useEffect(() => {
        dispatch(imageActions.getOneImage(imageId));
        if (userId) dispatch(getOneUser(userId));
    }, [imageId, dispatch, userId]);
    const imageUser = useSelector(state => state.user);


    if (!image) {
        return (
            <><h1>Image Not Found.</h1>
                <NavLink to="/images">Return to Image Browser</NavLink>
            </>
        )
    }
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
                <div className="details-container">
                    <div className="image">
                        <img src={image?.url} alt={image?.title} className="image-detail" />
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
                <div className="details-container">
                    <div className="image">
                        <img src={image?.url} className="image-detail" />
                    </div>
                    <div className="details">
                        <h2>{image?.title}</h2>
                        {imageUser && <div><NavLink to={`/users/${userId}`}>{imageUser?.username}</NavLink></div>}
                        <div>{image?.description}</div>
                    </div>
                    <div className="buttons">
                        {sessionUser.id === userId &&
                            <><CRUDImageFormModal modalData={modalData} /></>}
                    </div>
                </div>
            </>);
        }
    }
    return (<>{imageDetailContent} <AddToCollection imageId={imageId} /></>);

}

export default ImageDetailPage;
