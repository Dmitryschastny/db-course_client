import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { routes, Paths } from 'routes';
import { useLanguageCode } from 'hooks/useLanguageCode';
import { AppContext } from 'App';

const Navigation: React.FC = () => {
  const { user } = useContext(AppContext);

  const lang = useLanguageCode();

  const location = useLocation();

  let routesElements: React.ReactNode = [];
  if (lang) {
    routesElements = routes
      .filter(r => r.role === user.role.id || !r.role)
      .map(route => {
        if (route.path === Paths.SETTINGS || !route.title) {
          return null;
        }

        const active = location.pathname === route.path;
        const title = (route.title as any)[lang];

        return (
          <li className="mr-4" key={route.path}>
            {active ? (
              <span style={{ color: '#2196f3' }}>{title}</span>
            ) : (
              <Link to={route.path}>{title}</Link>
            )}
          </li>
        );
      });
  }

  return <ul className="flex">{routesElements}</ul>;
};

export { Navigation };
