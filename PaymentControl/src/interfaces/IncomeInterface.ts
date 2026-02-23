/*
 * @author: Daira
 * @date: 2026-01-16, Jan 16, 2026
 * @description: Interfaz para representar un gasto
 */


export default interface incomeInterface {
    id: string;
    name: string;
    description: string;
    amount: number;
    category: string;
}

/*
 * @description: Función para transformar datos de una API a la interfaz incomeInterface
 */
const SpendigFromAPI = (data: any) => {
    const gastos: incomeInterface[] = data.map((item: any) => ({
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
const FetchIncome = async (): Promise<incomeInterface[]> => {

    return new Promise(async(resolve,reject) => {
        try {
            const response = await fetch('http://localhost:8081/incomes');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const incomes = await response.json();
            const jsonData = SpendigFromAPI(incomes);
            resolve(jsonData);
        } catch (error) {
            reject(error);
        }
    });

};

/*
 * @description: Función para crear un nuevo gasto en la API
 */
const CreateIncome = async (newIncome: any): Promise<incomeInterface> => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch('http://localhost:8081/incomes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newIncome),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const newIncomeResponse = await response.json();
            resolve(newIncomeResponse);
        } catch (error) {
            reject(error);
        }
    });
};

const DeleteIncome = async (id: number): Promise<void> => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(`http://localhost:8081/incomes/${id}`, {
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
const UpdateIncome = async (id: number | string, updatedIncome: any) => {
    try {
        const response = await fetch(`http://localhost:8081/incomes/${id}`, {
            method: 'PUT', 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedIncome)
        });

        if (!response.ok) throw new Error('Error al actualizar');
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};
const TotalIncomes = async (date: Date): Promise<number> => {
    // Obtenemos YYYY-MM-DD
    const formattedDate = date.toISOString().split('T')[0];
    
    const response = await fetch(`http://localhost:8082/incomes/totalIncomes?date=${formattedDate}`);
    
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    return await response.json(); 
};
const TotalMissingIncomes = async (date: Date): Promise<number> => {
    // Obtenemos YYYY-MM-DD
    const formattedDate = date.toISOString().split('T')[0];
    
    const response = await fetch(`http://localhost:8082/incomes/totalMissingIncomes?date=${formattedDate}`);
    
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    return await response.json(); 
};

const getIncomesByDate = async (date: Date, type: string, paid: boolean): Promise<number> => {
    const formattedDate = date.toISOString().split('T')[0];
    const response = await fetch(`http://localhost:8082/incomes/totalIncomesByDate?date=${formattedDate}&type=${type}&paid=${paid}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return await response.json();
};

export { FetchIncome, CreateIncome, DeleteIncome, UpdateIncome, TotalIncomes, TotalMissingIncomes, getIncomesByDate };