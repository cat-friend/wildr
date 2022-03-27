import React, { useEffect, useState } from 'react';
import { Modal } from '../../context/Modal';
import CRUDImageForm from './CRUDImageForm';
import { useDispatch, useSelector } from "react-redux";
import * as imageActions from "../../store/images";
import { NavLink } from 'react-router-dom';


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
                <NavLink onClick={() => {
                    setEditModal(true);
                    setAction(EDIT);
                }} to="#">Edit</NavLink>
                {
                    editModal && (
                        <Modal onClose={() => setEditModal(false)}>
                            <CRUDImageForm formData={formData} />
                        </Modal>
                    )
                }
                <NavLink onClick={() => {
                    setDelModal(true);
                    setAction(DELETE);
                }} to="#">Delete</NavLink>
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
                <NavLink onClick={() => {
                    setCreateModal(true);
                    setAction(CREATE);
                }} to="#">Upload Image</NavLink>
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
