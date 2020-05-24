import React, { useState, useEffect } from 'react';
import 'styles/tailwind.css';
import './styles/global.scss';
import { Switch, Route } from 'react-router-dom';
import { clients } from 'services/clients.config';
import { ProtectedRoute } from 'components/ProtectedRoute';
import { routes } from 'routes';
import { User } from 'services/UsersService';
import { NoMath } from 'pages/NoMath';
import { Language } from 'services/LanguagesService';
import { Currency } from 'services/CurrenciesService';
import { Account } from 'services/AccountsService';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

type AuthContext = {
  authorized: boolean;
  onAuth(token: string): void;
  onLogout(): void;
};

type SettingsState = {
  language: Language;
  mainCurrency: Currency;
};

type AppContext = {
  user: User;
  settings: SettingsState;
  accounts: Account[];
  balance: number;
  updateBalance(): Promise<void>;
  onSettingsUpdate(s: SettingsState): void;
  onAccountsUpdate(a: Account[]): void;
};

export const AuthContext = React.createContext<AuthContext>({} as AuthContext);
export const AppContext = React.createContext<AppContext>({} as AppContext);

const App: React.FC = () => {
  const [authorized, setAuthorized] = useState(!!localStorage.getItem('token'));
  const [user, setUser] = useState<User>();

  const [settings, setSettings] = useState<SettingsState>();
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [balance, setBalance] = useState<number>(0);

  const [loading, setLoading] = useState(true);

  const handleSettingsUpdate = (s: SettingsState) => {
    setSettings(s);
  };

  const handleAccountsUpdate = (a: Account[]) => {
    setAccounts(a);
  };

  const updateBalance = async () => {
    const {
      data: { balance: userBalance },
    } = await clients.users.getBalance();

    setBalance(userBalance);
  };

  const verifyUser = async () => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const { data } = await clients.users.getByToken({ token });

        setUser(data.user);
        setSettings(data.settings);
        setAccounts(data.accounts);
        setAuthorized(true);
        updateBalance();
      } catch (error) {
        setAuthorized(false);
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  const handleAuth = (token: string) => {
    localStorage.setItem('token', token);

    verifyUser();
  };

  const handleLogout = () => {
    localStorage.removeItem('token');

    setAuthorized(false);
  };

  useEffect(() => {
    verifyUser();
  }, []);

  useEffect(() => {
    if (authorized) {
      updateBalance();
    }
  }, [accounts, settings]);

  const routesContent = (
    <Switch>
      {routes.map(({ path, page: Page, protected: p, role }) =>
        p ? (
          <ProtectedRoute path={path} key={path} exact role={role}>
            <Page />
          </ProtectedRoute>
        ) : (
          <Route key={path} path={path} exact>
            <Page />
          </Route>
        )
      )}
      <Route>
        <NoMath />
      </Route>
    </Switch>
  );

  const authContextValue = {
    authorized,
    onAuth: handleAuth,
    onLogout: handleLogout,
  };

  const appContextValue = {
    user: user!,
    settings: settings!,
    accounts: accounts!,
    balance,
    updateBalance,
    onSettingsUpdate: handleSettingsUpdate,
    onAccountsUpdate: handleAccountsUpdate,
  };

  return (
    <>
      {loading ? (
        <div className="h-full flex items-center justify-center">
          <Loader type="TailSpin" color="#2196f3" height={100} width={100} />
        </div>
      ) : (
        <AuthContext.Provider value={authContextValue}>
          <AppContext.Provider value={appContextValue}>
            {routesContent}
          </AppContext.Provider>
        </AuthContext.Provider>
      )}
    </>
  );
};

export { App };
