import { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Form from './components/Form';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(
        localStorage.getItem('authToken') !== null // Cambiar para verificar el token
    );

    const handleLoginSuccess = () => {
        setIsAuthenticated(true);
    };

    return (
        <Router>
            <Switch>
                <Route path="/" exact>
                    <Login onLoginSuccess={handleLoginSuccess} />
                </Route>
                <Route path="/form">
                    {isAuthenticated ? <Form /> : <Login onLoginSuccess={handleLoginSuccess} />}
                </Route>
            </Switch>
        </Router>
    );
};

export default App;
