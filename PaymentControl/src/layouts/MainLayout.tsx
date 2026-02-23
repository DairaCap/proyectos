
import './MainLayout.css';
/*
 * @author: Daira
 * @date: 2026-01-16, Jan 16, 2026
 * @description: Layout principal de la aplicación
 */



const MainLayout = (props: any) => {

    
    return <div className="app-container">
        <header className='header'>
            <h1>Control de gastos </h1>
        </header>

        <div className="main-layout"> {/* CONTENEDOR FLEX */}
            {/* <aside className='asidebar'> Barra</aside> */}

            <main className="main-content" >
                {props.children}
            </main>

        </div>

    </div>;
}

export default MainLayout;