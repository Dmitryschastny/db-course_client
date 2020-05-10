import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from 'App';
import { routes } from 'routes';

const Header: React.FC = () => {
  const { onLogout } = useContext(AuthContext);

  return (
    <div className="flex justify-between px-10 py-4">
      <ul className="flex">
        {routes.map(route =>
          route.title ? (
            <li className="mr-4" key={route.path}>
              <Link to={route.path}>{route.title}</Link>
            </li>
          ) : null
        )}
      </ul>
      <button type="button" onClick={onLogout}>
        Logout
      </button>
    </div>
  );
};

export { Header };
