import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CRUDImageForm from './EditImageForm';


function CRUDImageFormModal() {
    const [showModal, setShowModal] = useState(false);

    return (
      <>
        <button onClick={() => setShowModal(true)} to="#">Edit</button>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <CRUDImageForm />
          </Modal>
        )}
      </>
    );
  }

  export default CRUDImageFormModal;
