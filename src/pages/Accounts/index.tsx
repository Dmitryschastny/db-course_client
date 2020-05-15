import React from 'react';
import { PageTemplate } from 'components/templates/PageTemplate';
import { AddAccountForm } from 'components/AddAccountForm';
import { Modal } from 'components/Modal';

const Accounts: React.FC = () => {
  return (
    <PageTemplate title="Accounts">
      <Modal content={<AddAccountForm />}>
        {toggle => (
          <div className="md:w-1/2">
            <div className="flex text-lg font-bold mb-2 justify-between items-center">
              ACCOUNTS
              <button type="button" className="p-1" onClick={() => toggle()}>
                +
              </button>
            </div>
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
        )}
      </Modal>
    </PageTemplate>
  );
};

export { Accounts };
