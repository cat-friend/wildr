import React, { useEffect, useState } from 'react';
import { Modal } from '../../context/Modal';
import EditProfileForm from './UserPageEditForm';
import { useDispatch, useSelector } from "react-redux";
import * as imageActions from "../../store/images";
import { NavLink } from 'react-router-dom';

function EditProfileFormModal() {
    const [showModal, setShowModal] = useState(false);
    return (
        <>
            <Link onClick={() => setShowModal(true)} to="#" className='crud-link'>Edit Profile</Link>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditProfileForm />
                </Modal>
            )}
        </>
    );
}

export default EditProfileFormModal;
