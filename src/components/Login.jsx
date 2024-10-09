import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Login.css';

const Login = ({ onLoginSuccess }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [attempts, setAttempts] = useState(0);
    const [isDisabled, setIsDisabled] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
  
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();

        const validUsername = 'azteca';
        const validPassword = '12345';

        // Validación de campos vacíos
        if (!username || !password) {
            setErrorMessage('Por favor, complete ambos campos.');
            return;
        }
        // Validar credenciales
        if (username === validUsername && password === validPassword) {
        // Crear un token con la fecha de expiración
        const token = {
            username: validUsername,
            expires: Date.now() + 60 * 3000, // Expira en 3 minuto
        };
        localStorage.setItem('authToken', JSON.stringify(token)); // Guardar token en localStorage
        onLoginSuccess(); // Llamar a la función que cambia el estado de autenticación
        history.push('/form'); // Redirigir al formulario
        } else {
            setAttempts(attempts + 1);
            setErrorMessage('Usuario o contraseña incorrectos.');
            if (attempts >= 2) {
                console.log('Contraseña incorrecta');
                setIsDisabled(true);
            }
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <h2 className='title'>Login</h2>
                <div className="form-group">
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value);
                            setErrorMessage(''); // Limpiar mensaje de error al escribir
                        }}
                        disabled={isDisabled}
                        placeholder="Usuario"
                    />
                    <label className="form-label">Usuario:</label>
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setErrorMessage(''); // Limpiar mensaje de error al escribir
                        }}
                        disabled={isDisabled}
                        placeholder="Contraseña"
                    />
                    <label className="form-label">Contraseña:</label>
                </div>
                <div className="form-group">
                    <button type="submit" disabled={isDisabled}>
                        INGRESAR
                    </button>
                </div>
                
                {errorMessage && <p style={{ color: '#278252' }}>{errorMessage}</p>}
                {isDisabled && <p className="error-message">Has alcanzado el número máximo de intentos</p>}
            </form>
        </div>
    );
};

export default Login;
