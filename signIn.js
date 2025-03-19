import React, { useState } from 'react';
import { auth, provider } from './firebaseConfig'; // Asegúrate de importar la configuración de Firebase
import { signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleEmailSignIn = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await signInWithEmailAndPassword(auth, email, password);
            setError(null);
            setLoading(false);
            navigate("/");
            window.scrollTo(0, 0);
        } catch (error) {
            console.log(error.message);
            setError(error.message);
            setLoading(false);
        }
    };

    const loginPopupGoogle = async () => {
        setLoading(true);
        provider.setCustomParameters({ prompt: 'select_account' });

        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            // Actualiza el valor de user en el contexto (si es necesario)
            // setUser(user);

            setError(null);
            setLoading(false);
            navigate("/");
            window.scrollTo(0, 0);
        } catch (error) {
            console.log(error.message);
            setError(error.message);
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <h1>Iniciar Sesión</h1>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleEmailSignIn}>
                <div className="form-group">
                    <label htmlFor="email">Correo Electrónico</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Contraseña</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="login-button" disabled={loading}>
                    {loading ? 'Cargando...' : 'Iniciar sesión'}
                </button>
            </form>
            <button 
                className="google-login-button" 
                onClick={loginPopupGoogle} 
                disabled={loading}
            >
                {loading ? 'Cargando...' : 'Iniciar sesión con Google'}
            </button>
        </div>
    );
};

export default SignIn;
