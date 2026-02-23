
import { PieChart, Pie, ResponsiveContainer, Tooltip, Legend, Sector } from 'recharts';
import './PieCategories.css';


interface Props {
    spendings: any[];
}

const PieCategories = ({ spendings }: Props) => {
    // Definimos una paleta de colores moderna
    const COLORES_PALETA = ['#5f5f5f', '#5f5f5f', '#2c2c2c', '#c7c7c7', '#4e4e4e'];
    console.log("Spending en PieCategories", spendings);
    // Asignamos un color a cada dato antes de pasarlo a la gráfica
    const dataConColores = spendings.map((item, index) => ({
        ...item,
        fill: COLORES_PALETA[index % COLORES_PALETA.length]
    }));
    // Calculamos el total para mostrarlo en el centro si queremos
    const totalGasto = spendings.reduce((acc, curr) => acc + curr.amount, 0);
    // Usamos Sector para cumplir con la recomendación de Recharts
    const renderCustomSector = (props: any) => <Sector {...props} />;
    return (
        <div className="categorias-wrapper">
            <div className="categorias-label">
                <p className="cat-title">TOTAL GASTADO</p>
                <p className="cat-amount">${totalGasto}</p>
            </div>

            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Tooltip
                        formatter={(amount: number | undefined) => `$${amount ?? 0}`}
                        contentStyle={{ borderRadius: '12px', background: '#fff', border: 'none', color: '#fff' }}
                    />

                    <Pie
                        data={dataConColores}
                        cx="50%"
                        cy="50%"
                        innerRadius="60%"  // Efecto Dona
                        outerRadius="85%"
                        paddingAngle={3}   // Pequeña separación entre rebanadas
                        dataKey="amount"
                        stroke="none"
                        shape={renderCustomSector}
                    />

                    {/* La leyenda ayuda a identificar los colores sin tocar la gráfica */}
                    <Legend
                        verticalAlign="bottom"
                        height={39}
                        iconType="circle"
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default PieCategories;