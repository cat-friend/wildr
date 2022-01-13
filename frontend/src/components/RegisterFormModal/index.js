import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import { Link } from 'react-router-dom';
import RegisterForm from './RegisterForm';

function RegisterFormModal() {
    const [showRegister, setShowRegister] = useState(false);

    return (
        <>
            <Link onClick={() => setShowRegister(true)} to="#">Register</Link>
            {showRegister && (
                <Modal onClose={() => setShowRegister(false)}>
                    <RegisterForm />
                </Modal>
            )}
        </>
    );
}

export default RegisterFormModal;
