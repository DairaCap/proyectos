import { useEffect, useState } from "react";
import Category from "./Category.tsx";
import { Banana, ArrowLeft } from "lucide-react"; // Importamos ArrowLeft aquí
import { FetchCategory, type CategoryInterface } from "../../interfaces/CategoryInterface";
import "./CategorySection.css";
import TransactionForm from "./TransactionForm"; 

interface CategorySectionProps {
    categoryType: 'spending' | 'income';
    onBackToMenu: () => void; // Función para volver a la pantalla central
    onCloseModal: () => void;
}

const CategorySection = (props: CategorySectionProps) => {
    const [categorieslist, setCategorieslist] = useState<CategoryInterface[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<CategoryInterface | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await FetchCategory(props.categoryType);
                setCategorieslist(data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        fetchData();
    }, [props.categoryType]);

    return (
        // Contenedor principal que ocupa el 100% de la pantalla (Top o Bottom)
        <div className="full-screen-container">
            
            {/* El slider de 200% de ancho */}
            <div className={`internal-slider ${selectedCategory ? 'step-2' : 'step-1'}`}>
                
                {/* --- VISTA 1: LISTADO + BOTÓN ATRÁS --- */}
                <div className="internal-view">
                    
                    {/* Header de la Vista 1: Botón para volver al menú central */}
                    <div className="header-row" style={{ padding: '10px 0' }}>
                        <button className="back-btn-circle" onClick={props.onBackToMenu}>
                            <ArrowLeft size={20} color="#333" />
                        </button>
                        <span className="header-minimal">
                            Selecciona {props.categoryType === 'spending' ? 'Gasto' : 'Ingreso'}
                        </span>
                    </div>

                    {/* Lista de categorías con scroll */}
                    <div className="category-scroll-container">
                        <div className="categories-grid">
                            {categorieslist.map((cat) => (
                                <Category 
                                    key={cat.id} 
                                    category={cat} 
                                    icon={<Banana />} 
                                    onSelect={(cat) => setSelectedCategory(cat)} 
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* --- VISTA 2: FORMULARIO --- */}
                <div className="internal-view">
                    <TransactionForm 
                        type={props.categoryType}
                        category={selectedCategory}
                        onBack={() => setSelectedCategory(null)} // Volver a la lista
                        onSuccess={props.onCloseModal} 
                    />
                </div>

            </div>
        </div>
    );
};

export default CategorySection;