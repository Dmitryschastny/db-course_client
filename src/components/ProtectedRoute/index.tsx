import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AppContext } from 'App';

const ProtectedRoute: React.FC = ({ children, ...rest }) => {
  const { authorized } = useContext(AppContext);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        authorized ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/signin',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export { ProtectedRoute };
