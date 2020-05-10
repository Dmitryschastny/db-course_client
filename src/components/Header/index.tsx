import React, { useContext } from 'react';
import { Route, Redirect, Link } from 'react-router-dom';
import { AppContext } from 'App';
import { routes } from 'routes';

const Header: React.FC = () => {
  return (
    <div className="flex justify-between px-10 py-4">
      <ul className="flex">
        {routes.map(route =>
          route.title ? (
            <li className="mr-4">
              <Link to={route.path}>{route.title}</Link>
            </li>
          ) : null
        )}
      </ul>
      <button type="button">Logout</button>
    </div>
  );
};

export { Header };
