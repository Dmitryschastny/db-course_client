import React, { useContext } from 'react';
import { AuthContext, AppContext } from 'App';
import { useStrings } from 'hooks/useStrings';
import { Navigation } from 'components/Navigation';
import { routes, Paths } from 'routes';
import { Link, useLocation } from 'react-router-dom';
import { StringEntries, stringEntries } from './constants';

const Header: React.FC = () => {
  const { onLogout } = useContext(AuthContext);
  const { accounts } = useContext(AppContext);

  const strings = useStrings<StringEntries>(stringEntries);

  const location = useLocation();

  const settingsRoute = routes.find(r => r.path === Paths.SETTINGS);

  return (
    <div className="px-10 pt-4">
      <div className="flex justify-between mb-4">
        <Navigation />
        <div className="flex items-center">
          <button className="mr-4" type="button" onClick={onLogout}>
            {strings.logout}
          </button>
          <Link
            to={settingsRoute?.path || ''}
            className={
              location.pathname === Paths.SETTINGS ? 'text-red-600' : ''
            }
          >
            <i className="material-icons text-3xl align-middle">
              {settingsRoute?.icon}
            </i>
          </Link>
        </div>
      </div>
      <div className="text-xl font-bold">275 BYN</div>
      <div className="text-sm text-grey">Balance</div>
    </div>
  );
};

export { Header };
