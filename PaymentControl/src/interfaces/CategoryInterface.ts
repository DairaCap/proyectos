/*
 * @author: Daira
 * @date: 2026-01-16, Jan 16, 2026
 * @description: Interfaz para representar un gasto
 */



interface CategoryInterface {
    id: string;
    name: string;
    amount: number;
    percentage: number;
    is_percentage: boolean;
    parent: string | null;
    type: string;
}

/*
 * @description: Función para transformar datos de una API a la interfaz incomeInterface
 */
const CategoryFromAPI = (data: any) => {
    const gastos: CategoryInterface[] = data.map((item: any) => ({
        id: item.id,
        name: item.name,
        amont: item.amont,
        percentage: item.percentage,
        is_percentage: item.is_percentage,
        parent: item.parent,
        type: item.type,
    }));
    return gastos;
}
const AmountPerCategoryFromAPI = (data: any) => {
    const gastos: any[] = data.map((item: any) => ({
        name: item.categoryName,
        amount: item.amount,

    }));
    return gastos;
}

/*
 * @description: Función para obtener categorías desde una API
 */
const FetchCategory = async (type: string,categoryType: string, date): Promise<CategoryInterface[]> => {

    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(`http://localhost:8083/categories/type?type=${type}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const categories = await response.json();
            const jsonData = CategoryFromAPI(categories);
            resolve(jsonData);
        } catch (error) {
            reject(error);
        }
    });

};

/*
 * @description: Función para crear una nueva categoría en la API
 */
const CreateCategory = async (newCategory: any): Promise<CategoryInterface> => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch('http://localhost:8083/categories', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newCategory),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const newCategoryResponse = await response.json();
            resolve(newCategoryResponse);
        } catch (error) {
            reject(error);
        }
    });
};

const DeleteCategory = async (id: number): Promise<void> => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(`http://localhost:8083/categories/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            } else {
                resolve();
            }
        } catch (error) {
            reject(error);
        }
    });
}
// Agrega esto junto a tus otras funciones
const UpdateCategory = async (id: number | string, updatedCategory: any) => {
    try {
        const response = await fetch(`http://localhost:8083/categories/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedCategory)
        });

        if (!response.ok) throw new Error('Error al actualizar');
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};
const TotalPerCategory = async (category: string, type: string): Promise<number> => {

    const response = await fetch(`http://localhost:8083/categories/total?category=${category}&type=${type}`);

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    return await response.json();
};
const AmountPerCategory = async (date: Date, type: string, typeCategory: string): Promise<any[]> => {
    // Obtenemos YYYY-MM-DD
    const formattedDate = date.toISOString().split('T')[0];
    const response = await fetch(`http://localhost:8083/categories/amountPerCategory?date=${formattedDate}&type=${type}&categoryType=${typeCategory}`);
    try {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const categories = await response.json();
        const jsonData = AmountPerCategoryFromAPI(categories);
        return jsonData;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// En tu archivo de servicios o interfaces
const FetchAmountPerCategory = async (date: string, type: string) => {
    // Ejemplo: http://localhost:8080/amountPerCategory?date=2026-02-08&type=weekly
    const response = await fetch(`http://localhost:8083/categories/amountPerCategory?date=${date}&type=${type}`);
    if (!response.ok) throw new Error("Error en la petición");
    return await response.json(); // Retorna List<AmountPerCategory>
};

export {type CategoryInterface, FetchCategory, CreateCategory, DeleteCategory, UpdateCategory, TotalPerCategory, AmountPerCategory, FetchAmountPerCategory };