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
    const currId = useSelector(state => state.session.user.id);
    const isUser = Boolean(currId === +userId);
    const [collectionsIsCheckedArray, setCollectionsIsCheckedArray] = useState(new Array(collections?.length).fill(false));
    const collectionsArray = [];
    let checkedCollections
    const handleCheckboxOnChange = (index) => {
        const updatedCheckedState = collectionsIsCheckedArray.map((ele, i) => index === i ? !ele : ele)
        setChecked(updatedCheckedState)
        checkedCollections = collectionsArray.filter((ele, i) => {
            if (updatedCheckedState[i]) {
                return true
            };
            return false;
        });
    }
    const handleDeleteSubmit = (e) => {
        e.preventDefault();
        checkedCollections = collectionsArray.filter((ele, i) => {
            if (updatedCheckedState[i]) {
                return true
            };
            return false;
        });
        const payload = {
            collections: checkedCollections,
            
        }
    }

    return (<div>
        <h2>
            Collections
        </h2>
        {isUser && (<div><h2>newCollection</h2><h2>Delete selected</h2></div>)}
        <div className="collections">
            {collections.map((ele, i) => {
                collectionsArray.push(ele.id);
                return (
                    <div className="collection-badge" key={`${i}`}>
                        <NavLink to={`/collections/${ele.id}`}>{ele.title}</NavLink>
                        {isUser && (<><h2>edit?</h2><div>checkbox</div></>)}
                    </div>
                )
            })
            }
        </div>
    </div>)
}

export default CollectionsBrowser;
