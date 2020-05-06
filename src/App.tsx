import React from 'react';
import 'styles/tailwind.css';
import { Accounts } from 'pages/Accounts';
import { Transactions } from 'pages/Transactions';

const App: React.FC = () => {
  return (
    <div className="p-4">
      <Accounts />
      <div className="mb-20"></div>
      <Transactions />
    </div>
  );
};

export { App };
