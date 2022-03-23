import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CollectionDeleteForm from './CollectionDeleteForm';

function CollectionDeleteModal({collection}) {
    const [showModal, setShowModal] = useState(false);
    return (
        <>
            <div className="button-div">
                <button type="button" onClick={() => setShowModal(true)}>
                    DELETE
                </button>
            </div>
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
