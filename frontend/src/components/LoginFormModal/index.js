import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import { Link } from 'react-router-dom';
import LoginForm from './LoginForm';

function LoginFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Link onClick={() => setShowModal(true)} to="#" className='crud-li'>Log In</Link>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm />
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;
