import * as collectionActions from "../../store/collections";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';
import { useState } from "react";

function CollectionsRemoveImage({ collectionId, userId, imageId }) {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState([]);

    const removeImage = (e) => {
        e.preventDefault();
        const payload = {
            collectionId,
            imageId,
            userId
        }
        return dispatch(collectionActions.deleteFromCollection(payload))
            .then(() => { }, async (response) => {
                const data = await response.json();
                if (data && data.errors) setErrors(data.errors);
            })
    }

    return (<>
        <ul className="error-list">
            {errors.map((error, i) => <li key={i} className="errors">{error}</li>)}
        </ul>
        <NavLink to="#" onClick={(e) => removeImage(e)}>Remove</NavLink>
    </>
    )
}
export default CollectionsRemoveImage;
