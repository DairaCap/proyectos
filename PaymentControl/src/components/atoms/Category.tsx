// Category.tsx
import type { CategoryInterface } from "../../interfaces/CategoryInterface";
import "./Category.css";

// 1. Actualizamos las props para recibir onSelect
interface CategoryProps {
    category: CategoryInterface;
    icon: any;
    onSelect: (category: CategoryInterface) => void;
}

const Category = ({ category, icon, onSelect }: CategoryProps) => {
    return (
        // 2. Agregamos el evento onClick al contenedor
        <div className="category-container" onClick={() => onSelect(category)}>
            <div className="icon-container">
                {icon}
            </div>
            <div className="category">
                {category.name}
            </div>
        </div>
    );
};

export default Category;