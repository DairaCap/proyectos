import { useEffect, useState } from "react";
import type SpendingInterface from "../interfaces/SpendingInterface";
import { FetchSpending, TotalSpendings, TotalMissingSpendings } from "../interfaces/SpendingInterface";
import './Principal.css';
import Spending from "../components/atoms/Spending";
import ButtonAdd from "../components/atoms/ButtonAdd";
import { TotalIncomes, TotalMissingIncomes } from "../interfaces/IncomeInterface";
import Add from "../components/Add";
import PieSpendings from "../components/graphics/PieSpendings";
import { ArrowUp } from "lucide-react";
import PieCategories from "../components/graphics/PieCategories";
import { AmountPerCategory, FetchCategory } from "../interfaces/CategoryInterface";
import type {CategoryInterface} from "../interfaces/CategoryInterface";
import BarBalance from "../components/graphics/BarBalance";

/*
 * @author: Daira
 * @date: 2026-01-22
 * @description: Home page corregida (Sin bucle infinito y con ID real)
 */

const Principal = () => {
    const [spending, setSpending] = useState<SpendingInterface[]>([]);
    const [totalIncomes, setTotalIncomes] = useState<number>(0);
    const [totalSpendings, setTotalSpendings] = useState<number>(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<SpendingInterface | null>(null);
    const [totalMissingSpendings, setTotalMissingSpendings] = useState<number>(0);
    const [totalMissingIncomes, setTotalMissingIncomes] = useState<number>(0);
    const [amountPerCategory, setAmountPerCategory] = useState<any[]>([]);
    const [category, setCategory] = useState<CategoryInterface[]>([]);
    // 1. VARIABLE INTERRUPTOR: Para controlar cuándo recargar
    const [refresh, setRefresh] = useState(false);
    const misGastos = [
        { name: 'Comida', value: 300 },
        { name: 'Transporte', value: 100 },
        { name: 'Gustos', value: 40 },
        { name: 'Super', value: 60 },
    ];
    useEffect(() => {
        FetchSpending().then((data: SpendingInterface[]) => {
            setSpending(data);
        }).catch((error) => {
            console.error("Error fetching spending data:", error);
        });
    }, [refresh]);

    useEffect(() => {
        const fechaActual = new Date();
        TotalSpendings(fechaActual).then((data: number) => {
            setTotalSpendings(data);
        }).catch((error) => {
            console.error("Error fetching spending data:", error);
        });
    }, [refresh]);

    useEffect(() => {
        const fechaActual = new Date();
        TotalIncomes(fechaActual).then((data: number) => {
            setTotalIncomes(data);
        }).catch((error) => {
            console.error("Error fetching income data:", error);
        });
    }, [refresh]);

    useEffect(() => {
        const fechaActual = new Date();
        TotalMissingSpendings(fechaActual).then((data: number) => {
            setTotalMissingSpendings(data);
        }).catch((error) => {
            console.error("Error fetching missing spendings data:", error);
        });
    }, [refresh]);

    useEffect(() => {
        const fechaActual = new Date();
        TotalMissingIncomes(fechaActual).then((data: number) => {
            setTotalMissingIncomes(data);
        }).catch((error) => {
            console.error("Error fetching missing spendings data:", error);
        });
    }, [refresh]);

    useEffect(() => {
        const fechaActual = new Date();
        AmountPerCategory(fechaActual, "monthly", "spending").then((data: any[]) => {
            setAmountPerCategory(data);
        }).catch((error) => {
            console.error("Error fetching total per category data:", error);
        });
    }, [refresh]);

    useEffect(() => {
        FetchCategory().then((data: CategoryInterface[]) => {
            setCategory(data);
        }).catch((error) => {
            console.error("Error fetching category data:", error);
        });
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
        <div className="global">
            <div className="general">
                <div className="general-text">
                    <p>Balance</p>
                    <p className="general-detail-text">${totalSpendings} / ${totalIncomes}</p>
                </div>
                <div className="pie-container">
                    <PieSpendings
                        totalIncomes={totalIncomes}
                        totalSpendings={totalSpendings}
                        icon={<ArrowUp />} />
                </div>
            </div>

            <div className="general">
                <div className="general-text">
                    <p>Ingresos</p>
                    <p className="general-detail-text">${totalIncomes} / ${totalIncomes + totalMissingIncomes}</p>
                </div>
                <div className="pie-container">
                    <PieSpendings
                        totalIncomes={totalIncomes + totalMissingIncomes}
                        totalSpendings={totalMissingIncomes}
                        icon={<ArrowUp />} />
                </div>
            </div>
            <div className="general">
                <div className="general-text">
                    <p>Gastos</p>
                    <p className="general-detail-text">${totalSpendings} / ${totalSpendings + totalMissingSpendings}</p>
                </div>
                <div className="pie-container">
                    <PieSpendings
                        totalIncomes={totalSpendings + totalMissingSpendings}
                        totalSpendings={totalMissingSpendings}
                        icon={<ArrowUp />} />
                </div>
            </div>
        </div>

        <div className="vision">
            <div className="graphics-container">
                <div className="general">
                    <BarBalance />
                </div>

                <div className="general">
                    <PieCategories spendings={amountPerCategory} />

                </div>

            </div>
            <div className="details-container">
                <div className="spendings">
                    {spending.map(renderSpending)}
                </div>
                <div className="incomes">
                    {spending.map(renderSpending)}
                </div>
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

export default Principal;