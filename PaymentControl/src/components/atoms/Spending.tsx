import KebapMenu from "./KebapMenu";
import "./Spending.css";
import React from "react";
import { deleteSpending } from "../../interfaces/SpendingInterface"; 

interface SpendingProps {
    name: string;
    description: string;
    mount: number;
    category: string;
    id: number;
    onDeleted: () => void;
    onEdit: () => void; 
}

const Spending = ({ name, description, mount, category, id, onDeleted, onEdit }: SpendingProps) => { // <--- 2. LA RECIBIMOS AQUÍ
    const [isExpanded, setIsExpanded] = React.useState(false);

    const handleDeleteClick = async () => {
        const confirmacion = window.confirm(`¿Estás seguro de borrar "${name}"?`);

        if (confirmacion) {
            await deleteSpending(id);
            onDeleted(); 
        }
    };

    return (
        <div className={`spending-container ${isExpanded ? 'expanded' : ''}`}>
            <div className="spending-header">
                <div className="spending-amount" onClick={() => setIsExpanded(!isExpanded)}>
                    
                    <div className="spending-name">{name}</div>
                    <div className="spending-mount">${mount}</div>
                </div>

                <div className="spending-menu-zone">
                    <KebapMenu
                        onDelete={handleDeleteClick}
                        // 3. CONECTAMOS EL MENÚ CON LA PROP DEL PADRE
                        onEdit={onEdit} 
                    />
                </div>
            </div>

            <div className="spending-details">
                <p className="spending-category">{category}</p>
                <p className="spending-description">{description}</p>
            </div>
        </div>
    );
};

export default Spending;