import { SignIn } from 'pages/SignIn';
import React from 'react';
import { SignUp } from 'pages/SignUp';
import { Settings } from 'pages/Settings';
import { Accounts } from 'pages/Accounts';
import { Transactions } from 'pages/Transactions';

type Route = {
  path: string;
  title?: string;
  protected?: boolean;
  page: React.ComponentType;
};

enum Paths {
  SIGN_IN = '/signin',
  SIGN_UP = '/signup',
  SETTINGS = '/settings',
  TRANSACTIONS = '/transactions',
  ACCOUNTS = '/accounts',
}

const routes: Route[] = [
  {
    path: Paths.SIGN_IN,
    page: SignIn,
  },
  {
    path: Paths.SIGN_UP,
    page: SignUp,
  },
  {
    path: Paths.SETTINGS,
    title: 'Settings',
    protected: true,
    page: Settings,
  },
  {
    path: Paths.ACCOUNTS,
    title: 'Accounts',
    protected: true,
    page: Accounts,
  },
  {
    path: Paths.TRANSACTIONS,
    title: 'Transactions',
    protected: true,
    page: Transactions,
  },
];

export { routes };
