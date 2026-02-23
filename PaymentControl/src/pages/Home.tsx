import { useEffect, useState } from "react";
import type SpendingInterface from "../interfaces/SpendingInterface";
import { FetchSpending } from "../interfaces/SpendingInterface";
import './Home.css';
import Spending from "../components/atoms/Spending";
import ButtonAdd from "../components/atoms/ButtonAdd";
import Modal from "../components/Modal";
import Add from "../components/Add";


/*
 * @author: Daira
 * @date: 2026-01-22
 * @description: Home page corregida (Sin bucle infinito y con ID real)
 */

const Home = () => {
    const [spending, setSpending] = useState<SpendingInterface[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<SpendingInterface | null>(null);

    // 1. VARIABLE INTERRUPTOR: Para controlar cuándo recargar
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        FetchSpending().then((data: SpendingInterface[]) => {
            setSpending(data);
        }).catch((error) => {
            console.error("Error fetching spending data:", error);
        });
        // 2. CORRECCIÓN DEL BUCLE: Solo recarga si cambia 'refresh', no 'spending'
    }, [refresh]);

    // 3. FUNCIÓN DE RECARGA: Simplemente cambiamos el interruptor
    const handleSuccess = () => {
        setRefresh(!refresh);
    };
    const handleEditClick = (item: SpendingInterface) => {
        setEditingItem(item); // Guardamos el gasto seleccionado
        setIsModalOpen(true); // Abrimos el modal
    };


    const renderSpending = (item: SpendingInterface) => {
        return <Spending
            id={Number(item.id)}
            key={item.id}
            name={item.name}
            description={item.description}
            mount={item.amount}
            category={item.category}
            onDeleted={handleSuccess}
            onEdit={() => handleEditClick(item)}
        />
    };

    return <div className="home-container">
        <div className="resent-spending-list">
            {spending.map(renderSpending)}
        </div>
        <div className="spending-vision">
            <div className="spending-graph">
                Visión de gastos
            </div>
            <div className="spending-marker">
                Marcador de límites
            </div>
        </div>
        <div className='button-add'>
            <ButtonAdd onClick={() => setIsModalOpen(true)} />
        </div>
        <Add
            onSuccess={handleSuccess}
            isOpen={isModalOpen}
            onClose={() => {
                setIsModalOpen(false);
                setEditingItem(null); 
            }}
            spendingToEdit={editingItem}

        />
    </div>;
}

export default Home;