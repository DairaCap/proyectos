/*
 * @author: Daira
 * @date: 2026-01-16, Jan 16, 2026
 * @description: Interfaz para representar un gasto
 */

export default interface SpendingInterface {
    id: string;
    name: string;
    description: string;
    amount: number;
    category: string;
}

/*
 * @description: Función para transformar datos de una API a la interfaz SpendingInterface
 */
const SpendigFromAPI = (data: any) => {
    const gastos: SpendingInterface[] = data.map((item: any) => ({
        id: item.id,
        name: item.name,
        description: item.description,
        amount: item.amount,
        category: item.category,
    }));
    return gastos;
}

/*
 * @description: Función para obtener gastos desde una API
 */
const FetchSpending = async (): Promise<SpendingInterface[]> => {

    return new Promise(async(resolve,reject) => {
        try {
            const response = await fetch('http://localhost:8081/spendings');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const spendings = await response.json();
            const jsonData = SpendigFromAPI(spendings);
            resolve(jsonData);
        } catch (error) {
            reject(error);
        }
    });

};

/*
 * @description: Función para crear un nuevo gasto en la API
 */
const createSpending = async (newSpending: any): Promise<SpendingInterface> => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch('http://localhost:8081/spendings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newSpending),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const newSpendingResponse = await response.json();
            resolve(newSpendingResponse);
        } catch (error) {
            reject(error);
        }
    });
};

const deleteSpending = async (id: number): Promise<void> => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(`http://localhost:8081/spendings/${id}`, {
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
const updateSpending = async (id: number | string, updatedSpending: any) => {
    try {
        const response = await fetch(`http://localhost:8081/spendings/${id}`, {
            method: 'PUT', 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedSpending)
        });

        if (!response.ok) throw new Error('Error al actualizar');
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};



const TotalSpendings = async (date: Date): Promise<number> => {
    // Obtenemos YYYY-MM-DD
    const formattedDate = date.toISOString().split('T')[0];
    
    const response = await fetch(`http://localhost:8081/spendings/totalSpendings?date=${formattedDate}`);
    
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    return await response.json(); 
};
const TotalMissingSpendings = async (date: Date): Promise<number> => {
    // Obtenemos YYYY-MM-DD
    const formattedDate = date.toISOString().split('T')[0];
    
    const response = await fetch(`http://localhost:8081/spendings/totalMissingSpendings?date=${formattedDate}`);
    
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    return await response.json(); 
};
const getSpendingsByDate = async (date: Date, type: string, paid: boolean): Promise<number> => {
    const formattedDate = date.toISOString().split('T')[0];
    const response = await fetch(`http://localhost:8081/spendings/totalSpendingsByDate?date=${formattedDate}&type=${type}&paid=${paid}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return await response.json();
};

export { FetchSpending, createSpending, deleteSpending,updateSpending,TotalSpendings,TotalMissingSpendings, getSpendingsByDate };