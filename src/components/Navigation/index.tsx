import React from 'react';
import { Link } from 'react-router-dom';
import { routes } from 'routes';
import { useLanguageCode } from 'hooks/useLanguageCode';

const Navigation: React.FC = () => {
  const lang = useLanguageCode();

  if (!lang) {
    return null;
  }

  return (
    <ul className="flex">
      {routes.map(route =>
        route.title ? (
          <li className="mr-4" key={route.path}>
            <Link to={route.path}>{(route.title as any)[lang]}</Link>
          </li>
        ) : null
      )}
    </ul>
  );
};

export { Navigation };
