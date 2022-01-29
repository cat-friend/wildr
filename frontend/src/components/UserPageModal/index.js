import React, { useEffect, useState } from 'react';
import { Modal } from '../../context/Modal';
import EditProfileForm from './UserPageEditForm';
import { useDispatch, useSelector } from "react-redux";
import * as imageActions from "../../store/images";
import { NavLink } from 'react-router-dom';

function EditProfileFormModal({modalData}) {
    const [showModal, setShowModal] = useState(false);
    return (
        <>
            <NavLink onClick={() => setShowModal(true)} to="#" className='crud-link'>Edit Profile</NavLink>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditProfileForm modalData={modalData}/>
                </Modal>
            )}
        </>
    );
}

export default EditProfileFormModal;
