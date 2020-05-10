import React, { useState, useEffect } from 'react';
import 'styles/tailwind.css';
import './styles/global.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { clients } from 'services/clients.config';
import { ProtectedRoute } from 'components/ProtectedRoute';
import { routes } from 'routes';

interface AppContext {
  authorized: boolean;
  onAuth(token: string): void;
}

export const AppContext = React.createContext<AppContext>({} as AppContext);

const App: React.FC = () => {
  const [authorized, setAuthorized] = useState(false);

  const handleAuth = (token: string) => {
    localStorage.setItem('token', token);

    setAuthorized(true);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      setAuthorized(true);
    }
  }, []);

  return (
    <AppContext.Provider value={{ authorized, onAuth: handleAuth }}>
      <Router>
        <Switch>
          {routes.map(({ path, page: Page, protected: p }) => {
            const route = (
              <Route path={path}>
                <Page />
              </Route>
            );

            return p ? <ProtectedRoute>{route}</ProtectedRoute> : route;
          })}
        </Switch>
      </Router>
    </AppContext.Provider>
  );
};

export { App };
