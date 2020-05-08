import React, { useState, useEffect } from 'react';
import 'styles/tailwind.css';
import './styles/global.scss';
import { Accounts } from 'pages/Accounts';
import { Transactions } from 'pages/Transactions';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { SignIn } from 'pages/SignIn';
import { SignUp } from 'pages/SignUp';
import { clients } from 'services/clients.config';
import { ProtectedRoute } from 'components/ProtectedRoute';

interface AppContext {
  authorized: boolean;
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
    <AppContext.Provider value={{ authorized }}>
      <Router>
        <Switch>
          <Route path="/signin">
            <SignIn onAuth={handleAuth} />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <ProtectedRoute>
            <Route path="/transactions">
              <Transactions />
            </Route>
          </ProtectedRoute>
          <ProtectedRoute>
            <Route path="/accounts">
              <Accounts />
            </Route>
          </ProtectedRoute>
        </Switch>
      </Router>
    </AppContext.Provider>
  );
};

export { App };
