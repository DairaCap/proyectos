import React, { useState, useEffect } from 'react';
import './Modal.css';
// 1. IMPORTANTE: Importamos también el servicio de actualización
import { createSpending, updateSpending } from '../interfaces/SpendingInterface';

/*
 * @author: Daira
 * @date: 2026-01-22
 * @description: Modal Window para registrar o editar gastos
 */

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    spendingToEdit?: any;
}

const Modal = ({ isOpen, onClose, onSuccess, spendingToEdit }: ModalProps) => {

    if (!isOpen) return null;

    const [formData, setFormData] = useState({
        name: '',
        amount: '',
        category: '',
        description: '',
        paymentDate: new Date().toISOString().split('T')[0]
    });

    // Efecto para rellenar datos si es edición o limpiar si es nuevo
    useEffect(() => {
        if (spendingToEdit) {
            setFormData({
                name: spendingToEdit.name,
                amount: spendingToEdit.mount || spendingToEdit.amount, 
                category: spendingToEdit.category,
                description: spendingToEdit.description,
                paymentDate: spendingToEdit.paymentDate || new Date().toISOString().split('T')[0]
            });
        } else {
            setFormData({
                name: '',
                amount: '',
                category: '',
                description: '',
                paymentDate: new Date().toISOString().split('T')[0]
            });
        }
    }, [spendingToEdit, isOpen]); 

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        
        // Preparamos los datos
        const payload = {
            name: formData.name,
            amount: parseFloat(formData.amount),
            category: formData.category,
            description: formData.description,
            paymentDate: formData.paymentDate
        };

        try {
            if (spendingToEdit) {
                await updateSpending(spendingToEdit.id, payload);
                console.log("Gasto actualizado correctamente");
            } else {
                // --- MODO CREACIÓN ---
                await createSpending(payload);
                console.log("Gasto creado correctamente");
            }

            // Limpieza y cierre
            setFormData({ name: '', amount: '', category: '', description: '', paymentDate: '' });
            onSuccess(); // Recarga la lista en el padre
            onClose();   // Cierra el modal

        } catch (error) {
            console.error("Error saving spending:", error);
            alert("Hubo un error al guardar.");
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>{spendingToEdit ? 'Editar Gasto' : 'Registrar Gasto'}</h2>
                
                <form className="modal-form" onSubmit={handleSubmit}>

                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Nombre del gasto"
                        required
                    />

                    <input
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        placeholder="Monto ($)"
                        required
                    />

                    <input
                        type="date"
                        name="paymentDate"
                        value={formData.paymentDate}
                        onChange={handleChange}
                        required
                    />

                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Selecciona Categoría</option>
                        <option value="Comida">Comida</option>
                        <option value="Transporte">Transporte</option>
                        <option value="Ocio">Ocio</option>
                        <option value="Servicios">Servicios</option>
                        <option value="Salud">Salud</option>
                        <option value="Educación">Educación</option>
                        <option value="Ropa">Ropa</option>
                        <option value="Regalos">Regalos</option>
                    </select>

                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Descripción"
                    ></textarea>

                    <div className="modal-actions">
                        <button type="button" onClick={onClose} className="btn-cancel">
                            Cancelar
                        </button>
                        <button type="submit" className="btn-save">
                            {/* 4. Botón dinámico */}
                            {spendingToEdit ? 'Actualizar' : 'Guardar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Modal;