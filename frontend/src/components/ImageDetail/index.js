import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import * as imageActions from "../../store/images";

const ImageDetailPage = () => {
    const { imageId } = useParams();
    const dispatch = useDispatch();
    const image = useSelector(state => state.images[imageId]);
    const sessionUser = useSelector(state => state.session.user);
    const [showEditButton, setShowEditButton] = useState(false);
    useEffect(() => ) // set useEffect to listen to sessionuser (since ppl can log in with a modal)


    useEffect(() => {
        dispatch(imageActions.getOneImage(imageId));
    }, [imageId, dispatch]);

    if (!image) {
        return (
            <><h1>Image Not Found.</h1>
                <NavLink to="/images">Return to Image Browser</NavLink>
            </>
        )
    }

}
