import React from 'react';
import { PageTemplate } from 'components/templates/PageTemplate';

const Accounts: React.FC = () => {
  return (
    <PageTemplate title="Accounts">
      <div className="flex mb-4">
        <div className="p-1 border mr-2">МТБанк</div>
        <div className="p-1 border mr-2">Приорбанк</div>
        <button className="p-1">Connect a bank</button>
      </div>

      <div className="text-lg font-bold">CARDS AND ACCOUNTS</div>
      <table className="w-full">
        <tbody>
          <tr>
            <td>Cash</td>
            <td>57.71 BYN</td>
          </tr>
          <tr>
            <td>Salary</td>
            <td>14.15 BYN</td>
          </tr>
          <tr>
            <td>Savings</td>
            <td>550.57$</td>
          </tr>
        </tbody>
      </table>
    </PageTemplate>
  );
};

export { Accounts };
