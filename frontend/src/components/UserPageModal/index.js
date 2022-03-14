import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditProfileForm from './UserPageEditForm';
import { NavLink } from 'react-router-dom';

function EditProfileFormModal() {
    const [showModal, setShowModal] = useState(false);
    return (
        <>
            <NavLink onClick={() => setShowModal(true)} to="#" className='crud-link'>Edit Profile</NavLink>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditProfileForm setShowModal={setShowModal}/>
                </Modal>
            )}
        </>
    );
}

export default EditProfileFormModal;
