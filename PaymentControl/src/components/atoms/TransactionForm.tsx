// TransactionForm.tsx
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Check, Calendar, Repeat, FileText, DollarSign } from "lucide-react";
import type { CategoryInterface } from "../../interfaces/CategoryInterface";
import { createSpending } from "../../interfaces/SpendingInterface"; 
import { CreateIncome } from "../../interfaces/IncomeInterface"; 
import "./TransactionForm.css";

interface TransactionFormProps {
    type: 'spending' | 'income';
    category: CategoryInterface | null;
    onBack: () => void;
    onSuccess: () => void;
}

const TransactionForm = ({ type, category, onBack, onSuccess }: TransactionFormProps) => {
    // 1. Estados iniciales
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [isPaid, setIsPaid] = useState(true); // Switch Pagado por defecto true
    const [paymentDate, setPaymentDate] = useState(new Date().toISOString().split('T')[0]);
    
    // Lógica recurrente
    const [isRecurring, setIsRecurring] = useState(false);
    const [recurringDate, setRecurringDate] = useState(new Date().toISOString().split('T')[0]);
    
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);

    // 2. Efecto para cargar datos de la categoría seleccionada
    useEffect(() => {
        if (category) {
            setName(category.name); // El nombre por defecto es la categoría
            setAmount('');
            setIsPaid(true);
            setPaymentDate(new Date().toISOString().split('T')[0]);
            setIsRecurring(false);
            setDescription('');
        }
    }, [category]);

    // 3. Manejo del envío
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!category) return;
        setLoading(true);

        const payload = {
            name: name,
            amount: parseFloat(amount),
            category: category.name, 
            description: description,
            paymentDate: paymentDate,
            // Agrega aquí los campos extra si tu backend los soporta (recurring, paid status, etc)
            isPaid: isPaid, 
            isRecurring: isRecurring, 
            recurringDate: isRecurring ? recurringDate : null
        };

        try {
            if (type === 'spending') {
                await createSpending(payload);
            } else {
                await CreateIncome(payload);
            }
            onSuccess(); // Cierra el modal y recarga
        } catch (error) {
            console.error(error);
            alert("Error al guardar");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="minimalist-form">
            {/* Cabecera con botón atrás y título
            <div className="header-row">
                <button type="button" className="back-btn-circle" onClick={onBack}>
                    <ArrowLeft size={18} color="#333" />
                </button>

            </div> */}

            <form className="form-body" onSubmit={handleSubmit}>
                
                {/* Categoría (Solo lectura visual) */}
                <div className="glass-input" style={{ opacity: 0.7 }}>
                    <span style={{ fontSize: '14px', fontWeight: 'bold' }}>{category?.name}</span>
                </div>
                {/* Input: Monto */}
                <div className="input-field">
                    <DollarSign size={22} className="icon-label" />
                    <input 
                        type="number" 
                        placeholder="0.00" 
                        value={amount} 
                        onChange={(e) => setAmount(e.target.value)} 
                        step="0.01"
                        required 
                    />
                </div>
                
                {/* Input: Nombre (Editable) */}
                <div className="input-field">
                    <span className="small-label">Nombre</span>
                    <input 
                        type="text" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        required 
                    />
                </div>



                {/* Switch: Pagado */}
                <div className="toggle-container">
                    <span style={{ fontSize: '12px', color: '#666' }}>¿Ya se pagó?</span>
                    <button
                        type="button"
                        className={`status-indicator ${isPaid ? 'is-paid' : 'is-pending'}`}
                        onClick={() => setIsPaid(!isPaid)}
                    >
                        {isPaid && <Check size={14}/>}
                        {isPaid ? 'Pagado' : 'Pendiente'}
                    </button>
                </div>

                {/* Input: Fecha de Pago */}
                <div className="input-field">
                    <Calendar size={16} className="icon-label" />
                    <input 
                        type="date" 
                        value={paymentDate}
                        onChange={(e) => setPaymentDate(e.target.value)}
                        required
                    />
                </div>

                <hr style={{ border: '0', borderTop: '1px solid rgba(0,0,0,0.05)', margin: '5px 0' }}/>

                {/* Switch: Recurrente */}
                <div className="toggle-container">
                    <span style={{ fontSize: '12px', color: '#666' }}>¿Es recurrente?</span>
                    <input 
                        type="checkbox" 
                        checked={isRecurring} 
                        onChange={(e) => setIsRecurring(e.target.checked)} 
                        style={{ width: '20px', height: '20px', accentColor: '#222' }}
                    />
                </div>

                {/* Input: Fecha Recurrente (Solo si es recurrente) */}
                <div className="input-field" style={{ opacity: isRecurring ? 1 : 0.5 }}>
                    <Repeat size={16} className="icon-label" />
                    <input 
                        type="date" 
                        value={recurringDate}
                        onChange={(e) => setRecurringDate(e.target.value)}
                        disabled={!isRecurring}
                    />
                </div>

                {/* Input: Descripción */}
                <div className="input-field">
                    <FileText size={16} className="icon-label" />
                    <textarea 
                        rows={2}
                        placeholder="Nota opcional..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        style={{ resize: 'none' }}
                    />
                </div>

                {/* Botón Submit */}
                <button type="submit" className="submit-btn" disabled={loading}>
                    {loading ? 'Guardando...' : 'Confirmar'}
                </button>

            </form>
        </div>
    );
};

export default TransactionForm;