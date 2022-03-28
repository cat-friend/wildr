import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import * as collectionActions from "../../store/collections"
import { getOneUser } from "../../store/users"
import CollectionsImageBrowser from "./CollectionsImageBrowser";
import CollectionsEditForm from "./CollectionsEditForm";
import CollectionDeleteModal from "../CollectionDeleteModal";

function CollectionsDetail() {
    const { collectionId } = useParams();
    const dispatch = useDispatch();
    const collection = useSelector(state => state.collections);
    const userIdFromCollection = collection?.userId;
    const [showEdit, setShowEdit] = useState(false);
    useEffect(() => {
        dispatch(collectionActions.loadOneCollection(collectionId));
        if (userIdFromCollection > 0) dispatch(getOneUser(userIdFromCollection));
    }, [dispatch, collectionId, userIdFromCollection]);
    const currUserId = useSelector(state => state.session.user.id);
    const collectionOwner = useSelector(state => state.user);
    const isOwner = Boolean(currUserId === userIdFromCollection);

    const editClick = (e) => {
        e.preventDefault();
        setShowEdit(true);
    }

    return (
        <div>
            <div>
                {!showEdit && (<h1>{`${collection.title}`}</h1>)}
                {showEdit && <CollectionsEditForm collection={collection} setShowEdit={setShowEdit} />}
                <h2><NavLink to={`/users/${userIdFromCollection}`}>{`${collectionOwner?.username}`}</NavLink>'s Collection</h2>
                {isOwner &&
                    !showEdit && (<div className="button-div">
                        <button
                            className="dark-button"
                            type="button"
                            onClick={(e) => editClick(e)}>Edit</button>
                        <CollectionDeleteModal collection={collection} /></div>
                    )}
            </div>
            <CollectionsImageBrowser isOwner={isOwner} />
        </div >
    )
}

export default CollectionsDetail;
