import React, { useContext } from 'react';
import { Route, Redirect, useHistory, RouteProps } from 'react-router-dom';
import { AuthContext, AppContext } from 'App';
import { Paths } from 'routes';

interface Props extends RouteProps {
  role?: number;
}

const ProtectedRoute: React.FC<Props> = ({ role, children, ...props }) => {
  const { user } = useContext(AppContext);
  const { authorized } = useContext(AuthContext);

  const history = useHistory();

  return authorized ? (
    <>
      {role && user.role.id !== role ? (
        <>
          {user.role.id === 1 ? (
            <Redirect
              to={{
                pathname: Paths.USERS,
                state: { from: history.location },
              }}
            />
          ) : (
            <Redirect
              to={{
                pathname: Paths.ACCOUNTS,
                state: { from: history.location },
              }}
            />
          )}
        </>
      ) : (
        <Route {...props}>{children}</Route>
      )}
    </>
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
