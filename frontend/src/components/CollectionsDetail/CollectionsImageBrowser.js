import { NavLink } from "react-router-dom";
import CollectionsRemoveImage from "./CollectionsRemoveImage";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import * as collectionActions from "../../store/collections"

function CollectionsImageBrowser({ isOwner }) {
    const dispatch = useDispatch();
    const { collectionId } = useParams();
    useEffect(() => {
        dispatch(collectionActions.loadOneCollection(collectionId));
    }, [dispatch, collectionId]);
    const images = useSelector(state => { if (state.collections.images) return Object.values(state.collections.images) });
    const userId = useSelector(state => state.session.user.id)


    return (
        <div className='browser'><h2>Images</h2>
            <div className='images'>
                {images && images.length > 0 ? images.map((image, i) => {
                    return (<div key={i}>
                        <NavLink to={`/images/${image.id}`} key={image.id}><img src={image.url} key={image.id} alt={image.title} className="thumbnails" /></NavLink>
                        {isOwner &&
                            <CollectionsRemoveImage imageId={image.id} collectionId={collectionId} userId={userId} />}
                    </div>
                    )
                })
                    : <h2>This collection doesn't contain any images.</h2>}
            </div>
        </div>)
};

export default CollectionsImageBrowser
