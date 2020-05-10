import React, { useState, useEffect } from 'react';
import 'styles/tailwind.css';
import './styles/global.scss';
import { Switch, Route, useHistory } from 'react-router-dom';
import { clients } from 'services/clients.config';
import { ProtectedRoute } from 'components/ProtectedRoute';
import { routes, Paths } from 'routes';

interface AppContext {
  authorized: boolean;
  onAuth(token: string): void;
  onLogout(): void;
}

export const AppContext = React.createContext<AppContext>({} as AppContext);

const App: React.FC = () => {
  const [authorized, setAuthorized] = useState(false);

  const history = useHistory();

  const handleAuth = (token: string) => {
    localStorage.setItem('token', token);

    setAuthorized(true);
  };

  const handleLogout = () => {
    setAuthorized(false);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      setAuthorized(true);
      history.push(Paths.ACCOUNTS);
    }
  }, []);

  return (
    <AppContext.Provider
      value={{ authorized, onAuth: handleAuth, onLogout: handleLogout }}
    >
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
    </AppContext.Provider>
  );
};

export { App };
