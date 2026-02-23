// Add.tsx
import React from 'react';
import './Add.css';
import { SlidingContainer } from './atoms/SlidingContainer';

interface AddProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

const Add = ({ isOpen, onClose, onSuccess }: AddProps) => {

    if (!isOpen) return null;

    // Esta función se ejecuta cuando el formulario termina de guardar
    const handleSuccess = () => {
        onSuccess(); // Recargar datos
        onClose();   // Cerrar modal
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                {/* Pasamos handleSuccess al container */}
                <SlidingContainer onClose={handleSuccess}/>
            </div>
        </div>
    );
};

export default Add;