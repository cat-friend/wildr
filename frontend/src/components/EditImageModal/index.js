import React, { useEffect, useState } from 'react';
import { Modal } from '../../context/Modal';
import CRUDImageForm from './EditImageForm';


function CRUDImageFormModal({ modalData }) {
    const { crudAction, imageId } = modalData;
    console.log("crudAction", crudAction);
    const [showModal, setShowModal] = useState(false);
    const [action, setAction] = useState();
    const EDIT = "Edit";
    const DELETE = "Delete";
    const CREATE = "Upload Image";
    let displayedButtons = null;

    const formData = {
        action,
        imageId
    }

    if (crudAction === "edit/delete") {
        displayedButtons = (
            <>
                <button onClick={() => {
                    setShowModal(true);
                    setAction(EDIT);
                }} to="#">Edit</button>
                {
                    showModal && (
                        <Modal onClose={() => setShowModal(false)}>
                            <CRUDImageForm formData={formData} />
                        </Modal>
                    )
                }
                <button onClick={() => {
                    setShowModal(true);
                    setAction(DELETE);
                }} to="#">Delete</button>
                {
                    showModal && (
                        <Modal onClose={() => setShowModal(false)}>
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
                    setShowModal(true);
                    setAction(CREATE);
                }} to="#">Upload Image</button>
                {
                    showModal && (
                        <Modal onClose={() => setShowModal(false)}>
                            <CRUDImageForm formData={formData} />
                        </Modal>
                    )
                }
            </>)

    }
    return (<>
        <h1>Hello</h1>
        {displayedButtons}</>);
}

export default CRUDImageFormModal;
