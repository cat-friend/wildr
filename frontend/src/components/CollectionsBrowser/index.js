import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as collectionActions from "../../store/collections";
import { NavLink } from 'react-router-dom';
import CreateCollectionForm from "../CreateCollectionForm";

function CollectionsBrowser() {
    const { userId } = useParams();
    const [showCreateForm, setShowCreateForm] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(collectionActions.loadCollections(userId));
    }, [userId, dispatch]);
    const collections = useSelector(state => Object.values(state.collections));
    const currUserId = useSelector(state => state.session.user.id);
    const isUser = Boolean(currUserId === +userId);

    const createClick = (e) => {
        e.preventDefault();
        setShowCreateForm(true);
    }
    return (<div>
        <h2>
            Collections
        </h2>
        {isUser && (
            <div>
                {!showCreateForm && <h3><NavLink to="#" onClick={(e) => createClick(e)}>Create new collection</NavLink></h3>}
                {showCreateForm && <CreateCollectionForm setShowCreateForm={setShowCreateForm}/>}
            </div>
        )}
        <div className="collections">
            {collections.map((ele, i) => {
                return (
                    <div className="collection-badge" key={`${i}`}>
                        <NavLink to={`/collections/${ele.id}`}>{ele.title}</NavLink>
                    </div>
                )
            })
            }
        </div>
    </div >)
}

export default CollectionsBrowser;
