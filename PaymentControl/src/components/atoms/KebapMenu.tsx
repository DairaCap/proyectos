import { useState } from 'react';
import "./KebapMenu.css"
// Definimos qué funciones puede recibir este menú
interface KebapMenuProps {
    onEdit?: () => void;
    onDelete?: () => void;
}

const KebapMenu = ({ onEdit, onDelete}: KebapMenuProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="menu-opciones-wrapper" onMouseLeave={() => setIsOpen(false)}>
            <button
                className="dots-button"
                onClick={() => {
                    setIsOpen(!isOpen);
                }}
            >
                ⋮
            </button>

            {isOpen && (
                <ul className="dropdown-menu">
                    <li onClick={() => { onEdit?.(); setIsOpen(false); }}>Editar</li>
                    <li onClick={() => { onDelete?.(); setIsOpen(false); }}>Eliminar</li>
                </ul>
            )}
        </div>
    );
};

export default KebapMenu;