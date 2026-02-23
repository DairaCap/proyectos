import { PieChart, Pie, ResponsiveContainer, Tooltip, Sector } from 'recharts';
import './PieSpendings.css';

interface Props {
    totalIncomes: number;
    totalSpendings: number;
    icon?: any;
}

const PieSpendings = ({ totalIncomes, totalSpendings, icon }: Props) => {
    const isOverdraft = totalSpendings > totalIncomes;
    // Medidas de los círculos
    const innerRadius = "60%";      // Radio del hueco
    const baseOuterRadius = "80%";  // Radio del círculo gris
    // Si hay sobregiro, crece al 95%, pero nunca al 100% para evitar el corte
    const spendingRadius = isOverdraft ? "95%" : "80%";
    // Colores
    const COLORS = {
        incomeTrack: "#a5a5a5", // Color de la "pista" de fondo
        normal: "#000000",     // Color verde/azul estándar
        overdraft: "#ff4d4d"   // Rojo vibrante para el error
    };

    // Datos para la capa de progreso (Gasto)
    const data = isOverdraft
        ? [{ value: totalSpendings, fill: COLORS.overdraft }]
        : [
            { name: 'Gastado', value: totalSpendings, fill: COLORS.normal },
            { name: 'Restante', value: totalIncomes - totalSpendings, fill: 'transparent' }
        ];
    const renderCustomSector = (props: any) => {
        return <Sector {...props} />;
    }

    return (
        <div className="chart-wrapper">
            <div className="chart-label">
                <div>
                    {icon ? icon : ""}
                </div>
            </div>
            {/* Texto informativo en el centro */}
            {/* <div className={`chart-label ${isOverdraft ? 'text-danger' : ''}`}>
                <p className="label-title">{isOverdraft ? 'SOBREGIRO' : 'GASTADO'}</p>
                <p className="label-value">${totalSpendings} / ${TotalIncomes}</p>
            </div> */}

            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Tooltip
                        formatter={(value: number | undefined) => `$${value ?? 0}`}
                        contentStyle={{ borderRadius: '8px', background: '#cacaca', border: 'none', color: '#fff' }}
                    />

                    {/* CAPA 1: El "riel" o fondo que representa el presupuesto total (Ingresos) */}
                    <Pie
                        data={[{ value: 1 }]}
                        cx="50%" cy="50%"
                        innerRadius={innerRadius}
                        outerRadius={baseOuterRadius}
                        fill={COLORS.incomeTrack}
                        dataKey="value"
                        isAnimationActive={false}
                        stroke="none"
                    />

                    {/* CAPA 2: El Gasto real que puede "crecer" hacia afuera */}
                    <Pie
                        data={data}
                        cx="50%" cy="50%"
                        startAngle={90}
                        endAngle={isOverdraft ? -270 : 90 - (360 * totalIncomes / totalSpendings)}
                        innerRadius={innerRadius}
                        outerRadius={spendingRadius} // AQUÍ se aplica el radio más grande
                        dataKey="value"
                        stroke="none"

                        shape={renderCustomSector}
                    >

                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default PieSpendings;