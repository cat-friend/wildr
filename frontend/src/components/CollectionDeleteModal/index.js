import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CollectionDeleteForm from './CollectionDeleteForm';

function CollectionDeleteModal({ collection }) {
    const [showModal, setShowModal] = useState(false);
    return (
        <>
            <button
                type="button"
                onClick={() => setShowModal(true)}
                className="light-button">
                DELETE
            </button>
            {
                showModal &&
                (<Modal onClose={() => setShowModal(false)}>
                    <CollectionDeleteForm setShowModal={setShowModal} collection={collection} />
                </Modal>)
            }
        </>
    );
}

export default CollectionDeleteModal;
