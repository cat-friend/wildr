import React, { useEffect, useState } from 'react';
import { Modal } from '../../context/Modal';
import CRUDImageForm from './EditImageForm';
import { useDispatch, useSelector } from "react-redux";
import * as imageActions from "../../store/images";


function CRUDImageFormModal({ modalData }) {
    const { crudAction, imageId } = modalData;
    const dispatch = useDispatch();
    const [editModal, setEditModal] = useState(false);
    const [delModal, setDelModal] = useState(false);
    const [createModal, setCreateModal] = useState(false);
    const [action, setAction] = useState();
    const EDIT = "Edit";
    const DELETE = "Delete";
    const CREATE = "Upload Image";
    useEffect(() => {
        if (imageId > 0) dispatch(imageActions.getOneImage(imageId));
    }, [imageId, dispatch])
    const image = useSelector(state => state.images[imageId]);
    let displayedButtons = null;

    const formData = {
        action,
        image
    }

    if (crudAction === "edit/delete") {
        displayedButtons = (
            <>
                <button onClick={() => {
                    setEditModal(true);
                    setAction(EDIT);
                }} to="#">Edit</button>
                {
                    editModal && (
                        <Modal onClose={() => setEditModal(false)}>
                            <CRUDImageForm formData={formData} />
                        </Modal>
                    )
                }
                <button onClick={() => {
                    setDelModal(true);
                    setAction(DELETE);
                }} to="#">Delete</button>
                {
                    delModal && (
                        <Modal onClose={() => setDelModal(false)}>
                            <CRUDImageForm formData={formData} />
                        </Modal>
                    )
                }
            </>
        );
    }
    else {
        displayedButtons = (
            <>
                <button onClick={() => {
                    setCreateModal(true);
                    setAction(CREATE);
                }} to="#">Upload Image</button>
                {
                    createModal && (
                        <Modal onClose={() => setCreateModal(false)}>
                            <CRUDImageForm formData={formData} />
                        </Modal>
                    )
                }
            </>)

    }
    return (<>
        {displayedButtons}</>);
}

export default CRUDImageFormModal;
