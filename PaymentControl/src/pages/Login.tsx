import { useState } from "react";
import './Login.css';

/*
 * @author: Daira
 * @date: 2026-01-27
 * @description: Componente de Autenticación con transición animada entre Sign In y Sign Up
 */

const Login = () => {
    const [isSignUpActive, setIsSignUpActive] = useState(false);

    const handleSignUpClick = () => {
        setIsSignUpActive(true);
    };

    const handleSignInClick = () => {
        setIsSignUpActive(false);
    };

    return (
        <div className="login-page-container">
            <div className={`auth-container ${isSignUpActive ? "right-panel-active" : ""}`} id="container">
                
                
                <div className="form-container sign-up-container">
                    <form action="#">
                        <h1>Crear Cuenta</h1>

                        <span>Usa tu email para registrarte</span>
                        <input type="text" placeholder="Nombre" />
                        <input type="email" placeholder="Email" />
                        <input type="password" placeholder="Contraseña" />
                        <button type="button" className="auth-button">Registrarse</button>
                    </form>
                </div>

                <div className="form-container sign-in-container">
                    <form action="#">
                        <h1>Iniciar Sesión</h1>
                        <span>Ingresa tu cuenta</span>
                        <input type="email" placeholder="Email" />
                        <input type="password" placeholder="Contraseña" />
                        <a href="#" className="forgot-password">¿Olvidaste tu contraseña?</a>
                        <button type="button" className="auth-button">Entrar</button>
                    </form>
                </div>

                {/* Contenedor del Overlay (El fondo púrpura que se mueve) */}
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>¡Bienvenido de nuevo!</h1>
                            <p>Si ya tienes una cuenta, inicia sesión con tu información personal</p>
                            <button className="auth-button ghost" onClick={handleSignInClick}>Iniciar Sesión</button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>¡Hola!</h1>
                            <p>Introduce tus datos personales y comienza tu viaje con nosotros</p>
                            <button className="auth-button ghost" onClick={handleSignUpClick}>Registrarse</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;