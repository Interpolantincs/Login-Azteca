import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import './Form.css';

const Form = () => {
    const history = useHistory(); // Para redireccionar
    const [userId, setUserId] = useState('');
    const [userInfo, setUserInfo] = useState(null);
    const [error, setError] = useState('');

    // Verificar la autenticación al cargar el componente
    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('authToken'));

        // Verificar si el token existe y si no ha expirado
        if (!token || Date.now() > token.expires) {
            localStorage.removeItem('authToken'); // Eliminar token si ha expirado
            history.push('/'); // Redirigir al login si no está autenticado
        }
    }, [history]);

    const handleFetchUser = async () => {
        setError(''); // Limpiar error previo
        try {
            const response = await axios.get('/Usuarios.json');
            const users = response.data.usuarios; // Acceder al arreglo de usuarios

            // Buscar usuario por ID
            const user = users.find((user) => user.id === parseInt(userId)); // Convertir userId a número
            if (user) {
                setUserInfo(user);
            } else {
                setUserInfo(null);
                setError('Usuario no encontrado.'); // Mensaje de error si no se encuentra el usuario
            }
        } catch (err) {
            console.error('Error al obtener los datos:', err);
            setError('Error al obtener los datos.');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('authToken'); // Limpiar estado de autenticación
        history.push('/'); // Redirigir al login
    };

    return (
        <div className="form-container">
        <h2>Usuarios</h2>
        <div className="form">
          <label className="form-label">ID Usuario:</label>
          <input
            type="number"
            className="form-input"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
          <button className="form-button" onClick={handleFetchUser}>Buscar</button>

        </div>
        {error && <p style={{ color: '#278252' }}>{error}</p>}
        {userInfo && (
          <div className="form">
            <div>
              <label className="form-label">Nombre:</label>
              <input type="text" className="form-input" value={userInfo.nombres} disabled />
            </div>
            <div>
              <label className="form-label">Apellido Materno:</label>
              <input type="text" className="form-input" value={userInfo.apellidoMaterno} disabled />
            </div>
            <div>
              <label className="form-label">Apellido Paterno:</label>
              <input type="text" className="form-input" value={userInfo.apellidoPaterno} disabled />
            </div>
          </div>
          
        )}
        <div className="logout-container">
                <button className="form-button logout-button" onClick={handleLogout}>Cerrar Sesión</button>
            </div>
        
         </div>
    );
};

export default Form;
