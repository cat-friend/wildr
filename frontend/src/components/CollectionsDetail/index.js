import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as collectionActions from "../../store/collections"

function CollectionsDetail() {
    const { collectionId } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {

    })
    const userId = useSelector(state => state.session.user.id);
}

export default CollectionsDetail;
