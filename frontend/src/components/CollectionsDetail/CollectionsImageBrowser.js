import { NavLink } from "react-router-dom";

function CollectionsImageBrowser({ images, isOwner }) {

    if (images) {
        return (
            <div className='browser'><h2>Images</h2>
                <div className='images'>
                    {images.map((image) => {
                        return (<>
                            <NavLink to={`/images/${image.id}`} key={image.id}><img src={image.url} key={image.id} alt={image.title} className="thumbnails" /></NavLink>
                            {isOwner &&
                                (<div>
                                    Remove
                                </div>)}
                        </>
                        )
                    })}
                </div>
            </div>)
    }
    else
        return (<h2>This collection doesn't contain any images.</h2>)
};

export default CollectionsImageBrowser
