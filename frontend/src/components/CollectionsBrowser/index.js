import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as collectionActions from "../../store/collections";
import { NavLink } from 'react-router-dom';

function CollectionsBrowser() {
    const { userId } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(collectionActions.loadCollections(userId));
    }, [userId, dispatch]);
    const collections = useSelector(state => Object.values(state.collections));
    const currId = useSelector(state => state.session.user.id);
    const isUser = Boolean(currId === +userId);

    return (<div>
        <h2>
            Collections
        </h2>
        {isUser && (<div><h2>newCollection</h2><h2>Delete selected</h2></div>)}
        <div className="collections">
            {collections.map((ele, i) => {
                return (
                    <div className="collection-badge" key={`${i}`}>
                        <NavLink to={`/collections/${ele.id}`}>{ele.title}</NavLink>
                        {isUser && (<h2>edit?</h2>)}
                    </div>
                )
            })
            }

        </div>
    </div>)
}

export default CollectionsBrowser;
