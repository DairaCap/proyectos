import React, { useState, useRef } from 'react';

interface ButtonExpansivePops {
    name: string;
}
type ViewState = 'menu' | 'gasto' | 'ingreso';


const ButtonExpansive = ({ name }: ButtonExpansivePops) => {

    const [view, setView] = useState<ViewState>('menu');
    const [isActive, setIsActive] = useState<boolean>(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleNavigation = (e: React.MouseEvent<HTMLButtonElement>, targetView: ViewState, color: string) => {
        const container = containerRef.current;

        if (container) {
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Seteamos posición Y el COLOR dinámico
            container.style.setProperty('--x', `${x}px`);
            container.style.setProperty('--y', `${y}px`);
            container.style.setProperty('--bg-color', color);
        }

        setIsActive(true);

        // Cambiamos el contenido justo cuando el color ha cubierto la mayor parte
        setTimeout(() => {
            setView(targetView);
        }, 400);
    };

    return (
        <div
            ref={containerRef}
            className={`reveal-container ${isActive ? 'active' : ''}`}
        >
            <div className="page-content">
                {view === 'menu' && (
                    <div className="button-group">
                        {/* Pasamos el destino y el color que queremos para esa sección */}
                        <button onClick={(e) => handleNavigation(e, 'gasto', '#ff4757')}>
                            Registrar Gasto
                        </button>
                        <button onClick={(e) => handleNavigation(e, 'ingreso', '#2ed573')}>
                            Registrar Ingreso
                        </button>
                    </div>
                )}

                {view !== 'menu' && (
                    <div className="view-content">
                        <h2>Estás en: {view.toUpperCase()}</h2>
                    </div>
                )}
            </div>
        </div>
    );
};
export default ButtonExpansive;
