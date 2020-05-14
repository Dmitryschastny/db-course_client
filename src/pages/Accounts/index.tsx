import React from 'react';
import { PageTemplate } from 'components/templates/PageTemplate';
import { AddBankForm } from 'components/AddBankForm';
import { Modal } from 'components/Modal';

const Accounts: React.FC = () => {
  return (
    <PageTemplate title="Accounts">
      <Modal content={<AddBankForm />}>
        {toggle => (
          <div className="mb-8">
            <div className="text-lg font-bold mb-2">Banks</div>
            <div className="flex">
              <div className="p-1 border mr-2">МТБанк</div>
              <div className="p-1 border mr-2">Приорбанк</div>
              <button type="button" className="p-1" onClick={() => toggle()}>
                Add a bank +
              </button>
            </div>
          </div>
        )}
      </Modal>

      <div>
        <div className="text-lg font-bold mb-2">CARDS AND ACCOUNTS</div>
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
      </div>
    </PageTemplate>
  );
};

export { Accounts };
