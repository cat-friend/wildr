import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as collectionActions from "../../store/collections"

function CollectionsDetail() {
    const { collectionId } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        collectionActions.loadOneCollection(collectionId);
    }, [dispatch, collectionId]);
    const userId = useSelector(state => state.session.user.id);
    const images = useSelector (state => state.collections);

    return (
        <h1>IMAGES FOR COLLECTION ID #{`${collectionId}`} GO HERE</h1>
    )
}

export default CollectionsDetail;
