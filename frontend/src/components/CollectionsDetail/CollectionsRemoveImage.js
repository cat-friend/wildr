import * as collectionActions from "../../store/collections";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';

function CollectionsRemoveImage({ collectionId, userId, imageId }) {
    const dispatch = useDispatch();

    const removeImage = (e) => {
        e.preventDefault();
        const payload = {
            collectionId,
            imageId,
            userId
        }
        return dispatch(collectionActions.removeImage(payload))
            .then(() => {
                setShowSuccess(true);
                setTimeout(() => {
                    setShowSuccess(false);
                    setShowEdit(false);
                }, 750);
            }, async (response) => {
                const data = await response.json();
                if (data && data.errors) setErrors(data.errors);
            })
    }

    return (
        <NavLink to="#" onClick={(e) => removeImage(e)}>Remove</NavLink>
    )
}
export default CollectionsRemoveImage;
