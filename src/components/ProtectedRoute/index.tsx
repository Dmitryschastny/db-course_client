import React, { useContext } from 'react';
import { Route, Redirect, useHistory, RouteProps } from 'react-router-dom';
import { AuthContext } from 'App';
import { Paths } from 'routes';

type Props = RouteProps;

const ProtectedRoute: React.FC<Props> = ({ children, ...props }) => {
  const { authorized } = useContext(AuthContext);

  const history = useHistory();

  return authorized ? (
    <Route {...props}>{children}</Route>
  ) : (
    <Redirect
      to={{
        pathname: Paths.SIGN_IN,
        state: { from: history.location },
      }}
    />
  );
};

export { ProtectedRoute };
