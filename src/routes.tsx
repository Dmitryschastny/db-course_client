import { SignIn } from 'pages/SignIn';
import React from 'react';
import { SignUp } from 'pages/SignUp';
import { Settings } from 'pages/Settings';
import { Accounts } from 'pages/Accounts';
import { Transactions } from 'pages/Transactions';
import { Languages } from 'services/LanguagesService';
import { Users } from 'pages/Users';

type Route = {
  path: string;
  title?: Languages<string>;
  protected?: boolean;
  page: React.ComponentType;
  icon?: string;
  role?: number;
};

export enum Paths {
  HOME = '/accounts',
  SIGN_IN = '/signin',
  SIGN_UP = '/signup',
  SETTINGS = '/settings',
  TRANSACTIONS = '/transactions',
  ACCOUNTS = '/accounts',
  USERS = '/users',
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
    path: Paths.ACCOUNTS,
    title: {
      en: 'Accounts',
      ru: 'Аккаунты',
    },
    protected: true,
    page: Accounts,
    role: 2,
  },
  {
    path: Paths.TRANSACTIONS,
    title: {
      en: 'Transactions',
      ru: 'Транзакции',
    },
    protected: true,
    page: Transactions,
    role: 2,
  },
  {
    path: Paths.SETTINGS,
    title: {
      en: 'Settings',
      ru: 'Настройки',
    },
    protected: true,
    page: Settings,
    icon: 'settings',
    role: 2,
  },
  {
    path: Paths.USERS,
    title: {
      en: 'Users',
      ru: 'Пользователи',
    },
    protected: true,
    page: Users,
    role: 1,
  },
];

export { routes };
