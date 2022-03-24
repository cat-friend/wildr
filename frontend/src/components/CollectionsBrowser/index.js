import { useEffect, useState } from "react";
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

    return (<div>
        <h2>
            Collections
        </h2>
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
