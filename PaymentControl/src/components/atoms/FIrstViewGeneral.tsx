import { useState, useEffect} from "react";
import FirstViewGraph from "./FirstViewGraph";
import { TotalSpendings } from "../../interfaces/SpendingInterface";
import { TotalIncomes } from "../../interfaces/IncomeInterface";

interface FirstViewGeneralProps {
    refresh: ;
}

const FirstViewGeneral = ({ refresh }: FirstViewGeneralProps) => {
    const [totalIncomes, setTotalIncomes] = useState<number>(0);
    const [totalSpendings, setTotalSpendings] = useState<number>(0);

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

    return <div className="first-view-general">
        <FirstViewGraph name="Balance" totalSpendings={totalSpendings} totalIncomes={totalIncomes} />
        <FirstViewGraph name="Ingresos" totalSpendings={totalSpendings} totalIncomes={totalIncomes} />
        <FirstViewGraph name="Gastos" totalSpendings={totalSpendings} totalIncomes={totalIncomes} />
    </div>

}
export default FirstViewGeneral;
