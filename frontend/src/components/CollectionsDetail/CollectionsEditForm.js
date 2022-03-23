import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as collectionActions from "../../store/collections";

function CollectionsEditForm({ collection }) {
    const dispatch = useDispatch();
    const [title, setTitle] = useState(collection.title);
    return (<form><input
        type={text}
        value={title}
        placeholder="Title of collection"
        onChange={(e) =>setTitle(e.target.value)}
        />
        </form>
    )
}

export default CollectionsEditForm;
