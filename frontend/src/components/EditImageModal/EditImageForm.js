import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as imageActions from "../../store/images";

function CRUDImageForm({ formData }) {
    const { action, imageId } = formData;
    // if action = create, edit, delete --> generate appropriate CRUD form
    let modalContent;
    if (imageId > 0) {
        
    }
    switch (action) {
        case "Edit": {
            modalContent = (<><h1>edit</h1>
            </>)
            break;
        }
        case "Delete": {
            modalContent = (<><h1>delete</h1>
            </>)
            break;
        }
        case "Upload Image": {
            modalContent = (<><h1>create</h1>
            </>)
            break;
        }
        default: return null;
    }
    return modalContent;
}

export default CRUDImageForm;
