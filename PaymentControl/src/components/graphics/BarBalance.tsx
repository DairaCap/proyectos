import React, { useState, useEffect, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend, ReferenceLine } from 'recharts';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './BarBalance.css';
import { getIncomesByDate } from '../../interfaces/IncomeInterface';
import { getSpendingsByDate } from '../../interfaces/SpendingInterface';

const BarBalance = () => {
    const [view, setView] = useState<'weekly' | 'monthly' | 'yearly'>('weekly');
    const [baseDate, setBaseDate] = useState(new Date());
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const today = new Date();

    // Encontramos el nombre del periodo actual para la línea de referencia
    const currentPeriodName = useMemo(() => {
        const current = data.find(d => d.isCurrent);
        return current ? current.name : null;
    }, [data]);

    const handleNavigate = (direction: 'prev' | 'next') => {
        const newDate = new Date(baseDate);
        const step = direction === 'prev' ? -1 : 1;
        if (view === 'weekly') newDate.setDate(baseDate.getDate() + (step * 7));
        else if (view === 'monthly') newDate.setFullYear(baseDate.getFullYear() + step);
        else newDate.setFullYear(baseDate.getFullYear() + (step * 10));
        setBaseDate(newDate);
    };

    const rangeLabel = useMemo(() => {
        if (view === 'weekly') {
            const start = new Date(baseDate);
            start.setDate(baseDate.getDate() - (baseDate.getDay() === 0 ? 6 : baseDate.getDay() - 1));
            const end = new Date(start);
            end.setDate(start.getDate() + 6);
            return `${start.toLocaleDateString(undefined, { day: 'numeric', month: 'short' })} - ${end.toLocaleDateString(undefined, { day: 'numeric', month: 'short' })}`;
        }
        return view === 'monthly' ? baseDate.getFullYear().toString() : `${baseDate.getFullYear() - 9} - ${baseDate.getFullYear()}`;
    }, [view, baseDate]);

    useEffect(() => {
        const loadChartData = async () => {
            setLoading(true);
            let results = [];

            try {
                if (view === 'weekly') {
                    const totalMonthlyIncome = await getIncomesByDate(baseDate, "monthly", true);
                    const lastDayOfMonth = new Date(baseDate.getFullYear(), baseDate.getMonth() + 1, 0).getDate();
                    const dailyBudget = totalMonthlyIncome / lastDayOfMonth;

                    const startOfWeek = new Date(baseDate);
                    startOfWeek.setDate(baseDate.getDate() - (baseDate.getDay() === 0 ? 6 : baseDate.getDay() - 1));

                    const promises = Array.from({ length: 7 }).map(async (_, i) => {
                        const date = new Date(startOfWeek);
                        date.setDate(startOfWeek.getDate() + i);
                        const spent = await getSpendingsByDate(date, "default", true);
                        
                        const dayName = date.toLocaleDateString('es-ES', { weekday: 'short' }).replace('.', '');
                        const dayLabel = `${dayName.charAt(0).toUpperCase() + dayName.slice(1)} ${date.getDate()}`;

                        return {
                            name: dayLabel,
                            Presupuesto: Number(dailyBudget.toFixed(2)),
                            Gastado: spent,
                            isCurrent: date.toDateString() === today.toDateString()
                        };
                    });
                    results = await Promise.all(promises);

                } else if (view === 'monthly') {
                    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
                    const promises = months.map(async (name, i) => {
                        const date = new Date(baseDate.getFullYear(), i, 1);
                        const [income, spent] = await Promise.all([
                            getIncomesByDate(date, "monthly", true),
                            getSpendingsByDate(date, "monthly", true)
                        ]);

                        return {
                            name,
                            Presupuesto: income,
                            Gastado: spent,
                            isCurrent: date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear()
                        };
                    });
                    results = await Promise.all(promises);

                } else {
                    const currentYear = baseDate.getFullYear();
                    const years = Array.from({ length: 10 }, (_, i) => (currentYear - 9 + i).toString());

                    const promises = years.map(async (yearStr) => {
                        const date = new Date(parseInt(yearStr), 0, 1);
                        const [income, spent] = await Promise.all([
                            getIncomesByDate(date, "yearly", true),
                            getSpendingsByDate(date, "yearly", true)
                        ]);

                        return {
                            name: yearStr,
                            Presupuesto: income,
                            Gastado: spent,
                            isCurrent: parseInt(yearStr) === today.getFullYear()
                        };
                    });
                    results = await Promise.all(promises);
                }
                setData(results);
            } catch (error) {
                console.error("Error en la gráfica:", error);
            } finally {
                setLoading(false);
            }
        };

        loadChartData();
    }, [view, baseDate]);

    return (
        <div className="bar-balance-container">
            <div className="bar-header">
                <div className="filter-buttons">
                    <button className={view === 'weekly' ? 'active' : ''} onClick={() => setView('weekly')}>Días</button>
                    <button className={view === 'monthly' ? 'active' : ''} onClick={() => setView('monthly')}>Meses</button>
                    <button className={view === 'yearly' ? 'active' : ''} onClick={() => setView('yearly')}>Años</button>
                </div>

                <div className="nav-controls">
                    <button onClick={() => handleNavigate('prev')}><ChevronLeft size={18} /></button>
                    <span className="current-range-label">{rangeLabel}</span>
                    <button onClick={() => handleNavigate('next')}><ChevronRight size={18} /></button>
                </div>
            </div>

            <div className="chart-content" style={{ opacity: loading ? 0.5 : 1 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#444" />
                        <XAxis dataKey="name" stroke="#ccc" fontSize={10} tickLine={false} />
                        <YAxis stroke="#ccc" fontSize={10} tickLine={false} />
                        <Tooltip contentStyle={{ background: '#dfdfdf', border: 'none', color: '#000' }} />
                        <Legend wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }} />

                        {/* LA LÍNEA DEL TIEMPO: Se dibuja sobre el eje X del periodo actual */}
                        {currentPeriodName && (
                            <ReferenceLine 
                                x={currentPeriodName} 
                                stroke="#4b4b4b" 
                                strokeDasharray="5 5"
                                strokeWidth={2}
                                label={{ position: 'top', value: '', fill: '#346a74', fontSize: 10, fontWeight: 'bold' }} 
                            />
                        )}

                        <Bar dataKey="Presupuesto" name="Presupuesto Real" fill="rgba(80, 80, 80, 0.3)" barSize={15} radius={[4, 4, 0, 0]} />
                        <Bar dataKey="Gastado" name="Gasto Total" barSize={15} radius={[4, 4, 0, 0]}>
                            {data.map((entry, index) => {
                                // Color negro por defecto, rojo si hay exceso
                                let barColor = '#000000';
                                if (entry.Gastado > entry.Presupuesto && entry.Presupuesto > 0) {
                                    barColor = '#ff4d4d';
                                }
                                return <Cell key={`cell-${index}`} fill={barColor} />;
                            })}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default BarBalance;