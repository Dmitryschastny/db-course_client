import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { routes, Paths } from 'routes';
import { useLanguageCode } from 'hooks/useLanguageCode';

const Navigation: React.FC = () => {
  const lang = useLanguageCode();

  const location = useLocation();

  let routesElements: React.ReactNode = [];
  if (lang) {
    routesElements = routes.map(route => {
      if (route.path === Paths.SETTINGS) {
        return null;
      }

      const active = location.pathname === route.path;

      return route.title ? (
        <li className="mr-4" key={route.path}>
          <Link to={route.path} className={active ? 'text-red-600' : ''}>
            {(route.title as any)[lang]}
          </Link>
        </li>
      ) : null;
    });
  }

  return <ul className="flex">{routesElements}</ul>;
};

export { Navigation };
