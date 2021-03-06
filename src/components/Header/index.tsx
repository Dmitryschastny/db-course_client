import React, { useContext } from 'react';
import { AuthContext, AppContext } from 'App';
import { useStrings } from 'hooks/useStrings';
import { Navigation } from 'components/Navigation';
import { routes, Paths } from 'routes';
import { Link, useLocation } from 'react-router-dom';
import { StringEntries, stringEntries } from './constants';

const Header: React.FC = () => {
  const { onLogout } = useContext(AuthContext);
  const { user, settings, balance } = useContext(AppContext);

  const strings = useStrings<StringEntries>(stringEntries);

  const location = useLocation();

  const settingsRoute = routes.find(r => r.path === Paths.SETTINGS);
  const settingsActive = location.pathname === Paths.SETTINGS;

  const currency = settings.mainCurrency.code;

  return (
    <div className="px-10 pt-4">
      <div className="flex justify-between mb-4">
        <Navigation />
        <div className="flex items-center">
          <button className="mr-4" type="button" onClick={onLogout}>
            {strings.logout}
          </button>
          {user.role.id === 2 ? (
            <>
              {settingsActive ? (
                <i
                  className="material-icons text-3xl align-middle"
                  style={{ color: '#2196f3' }}
                >
                  {settingsRoute?.icon}
                </i>
              ) : (
                <Link to={settingsRoute?.path || ''}>
                  <i className="material-icons text-3xl align-middle">
                    {settingsRoute?.icon}
                  </i>
                </Link>
              )}
            </>
          ) : (
            strings.admin
          )}
        </div>
      </div>
      {user.role.id === 2 && (
        <>
          <div className="text-xl font-bold">
            {balance.toFixed(2)} {currency}
          </div>
          <div className="text-sm text-grey">{strings.balance}</div>
        </>
      )}
    </div>
  );
};

export { Header };
