import { NavLink } from "react-router-dom";
import CollectionsRemoveImage from "./CollectionsRemoveImage";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function CollectionsImageBrowser({ images, isOwner }) {
    const { collectionId } = useParams();
    const userId = useSelector(state => state.user.id)

    if (images) {
        return (
            <div className='browser'><h2>Images</h2>
                <div className='images'>
                    {images.map((image, i) => {
                        return (<div key={i}>
                            <NavLink to={`/images/${image.id}`} key={image.id}><img src={image.url} key={image.id} alt={image.title} className="thumbnails" /></NavLink>
                            {isOwner &&
                                <CollectionsRemoveImage imageId={image.id} collectionId={collectionId} userId={userId} />}
                        </div>
                        )
                    })}
                </div>
            </div>)
    }
    else
        return (<h2>This collection doesn't contain any images.</h2>)
};

export default CollectionsImageBrowser
