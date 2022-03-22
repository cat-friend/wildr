import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as collectionActions from "../../store/collections"
import { getOneUser } from "../../store/users"

function CollectionsDetail() {
    const { collectionId } = useParams();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    useEffect(() => {
        dispatch(collectionActions.loadOneCollection(collectionId));
    }, [dispatch, collectionId]);
    const currUserId = useSelector(state => state.session.user.id);
    const images = useSelector(state => state.collections);

    return (
        <div>
            <h1>IMAGES FOR COLLECTION ID #{`${collectionId}`} GO HERE</h1>
            <h2></h2>
        </div>
    )
}

export default CollectionsDetail;
