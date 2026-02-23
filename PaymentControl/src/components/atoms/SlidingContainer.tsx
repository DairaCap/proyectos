import React, { useState } from 'react';
import './SlidingContainer.css';
import CategorySection from './CategorySection'; // Este componente ahora manejará TODO el contenido deslizante

interface SlidingContainerProps {
    onClose: () => void;
}

const SlidingContainer = ({ onClose }: SlidingContainerProps) => {
    const [view, setView] = useState(2); // 1: Gastos, 2: Menú, 3: Ingresos

    return (
        <div className="viewport">
            <div className={`sliding-rail view-${view}`}>

                {/* PANTALLA 1: ARRIBA (GASTOS) */}
                <div className="screen-top">
                    {/* Quitamos divs extra y dejamos que CategorySection ocupe todo */}
                    <CategorySection 
                        categoryType='spending' 
                        onBackToMenu={() => setView(2)} // Pasamos la función para volver al centro
                        onCloseModal={onClose} 
                    />
                </div>

                {/* PANTALLA 2: CENTRO (MENÚ PRINCIPAL) */}
                <div className="screen screen-center">
                    <h3>¿Qué deseas agregar?</h3>
                    <div className="button-stack">
                        <button className="push-btn btn-up" onClick={() => setView(1)}>
                            Gasto
                        </button>

                        <button className="push-btn btn-down" onClick={() => setView(3)}>
                            Ingreso
                        </button>
                    </div>
                </div>

                {/* PANTALLA 3: ABAJO (INGRESOS) */}
                <div className="screen-botton">
                    <CategorySection 
                        categoryType='income' 
                        onBackToMenu={() => setView(2)} // Pasamos la función para volver al centro
                        onCloseModal={onClose} 
                    />
                </div>

            </div>
        </div>
    );
};

export { SlidingContainer };