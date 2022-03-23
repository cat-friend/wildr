import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import * as collectionActions from "../../store/collections"
import { getOneUser } from "../../store/users"
import CollectionsImageBrowser from "./CollectionsImageBrowser";
import CollectionEditModal from "../CollectionsEditModal";
import CollectionsEditForm from "./CollectionsEditForm";

function CollectionsDetail() {
    const { collectionId } = useParams();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const collection = useSelector(state => state.collections);
    const userIdFromCollection = collection?.userId;
    const [showEdit, setShowEdit] = useState(false);
    useEffect(() => {
        dispatch(collectionActions.loadOneCollection(collectionId));
        if (userIdFromCollection > 0) dispatch(getOneUser(userIdFromCollection));
    }, [dispatch, collectionId, userIdFromCollection]);
    const currUserId = useSelector(state => state.session.user.id);
    const images = Object.entries(collection).length > 0 ? Object.values(collection?.images) : undefined;
    const collectionOwner = useSelector(state => state.user);
    const isOwner = Boolean(currUserId === userIdFromCollection);

    return (
        <div>
            <div>
                {!showEdit && (<h1>{`${collection.title}`}</h1>)}
                {showEdit && <CollectionsEditForm collection={collection} setShowEdit={setShowEdit}/>}
                <h2><NavLink to={`/users/${userIdFromCollection}`}>{`${collectionOwner?.username}`}</NavLink>'s Collection</h2>
                {isOwner && (<>
                    <h2>DELETE</h2>
                </>)}
            </div>
            <CollectionsImageBrowser images={images} isOwner={isOwner} />
        </div >
    )
}

export default CollectionsDetail;
