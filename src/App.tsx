import React from 'react';
import 'styles/tailwind.css';
import './styles/global.scss';
import { Accounts } from 'pages/Accounts';
import { Transactions } from 'pages/Transactions';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { SignIn } from 'pages/SignIn';
import { SignUp } from 'pages/SignUp';

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/signin">
          <SignIn />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/accounts">
          <Accounts />
        </Route>
        <Route path="/transactions">
          <Transactions />
        </Route>
      </Switch>
    </Router>
  );
};

export { App };
