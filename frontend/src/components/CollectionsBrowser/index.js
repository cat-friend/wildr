import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as collectionActions from "../../store/collections";
import { NavLink } from 'react-router-dom';

function CollectionsBrowser() {
    const { userId } = useParams();
    const dispatch = useDispatch();
    const [errors, setErrors] = useState([]);
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

    const handleSubmitBulkDelete = (e) => {
        e.preventDefault();
        checkedCollections = collectionsArray.filter((ele, i) => {
            if (updatedCheckedState[i]) {
                return true
            };
            return false;
        });
        // loop through checkedColelctions and delete each one
        for (let i = 0; i < checkedCollections.length; i++) {
            const payload = {
                collectionId: checkedCollections[i].id,
                userId
            }
            dispatch(collectionActions.deleteCollection(payload))
                .then(() => { return },
                    async (response) => {
                        const data = await response.json();
                        if (data && data.errors) setErrors(data.errors);
                    });
        }
    }

    return (<div>
        <h2>
            Collections
        </h2>
        {isUser &&
            (<div>
                <h2>newCollection</h2><h2><NavLink to="#" onClick={(e) => handleSubmitBulkDelete(e)}>Delete selected</NavLink></h2></div>)
        }
        <div className="collections">
            {collections.map((ele, i) => {
                return (
                    <div className="collection-badge" key={`${i}`}>
                        {isUser && collectionsArray.push(ele.id) && (<input
                            type="checkbox"
                            id={`mode-checkbox-${index}`}
                            key={`mode-checkbox-${index}`}
                            name={ele}
                            checked={checked[index]}
                            onChange={() => handleCheckboxOnChange(index)}
                        />
                        )}
                        <NavLink to={`/collections/${ele.id}`}>{ele.title}</NavLink>
                    </div>
                )
            })
            }
        </div>
    </div >)
}

export default CollectionsBrowser;
