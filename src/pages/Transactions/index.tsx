import React from 'react';
import { PageTemplate } from 'components/templates/PageTemplate';
import { Modal } from 'components/Modal';
import { AddTransactionForm } from 'components/AddTransactionForm';

const Transactions: React.FC = () => {
  return (
    <PageTemplate title="Transactions">
      <div className="flex flex-col md:w-1/2">
        <div className="flex items-center mb-2 justify-between">
          <Modal content={<AddTransactionForm />}>
            {toggle => (
              <>
                <div className="ext-lg font-bold">Transactions</div>
                <button
                  type="button"
                  className="p-1 w-10 self-end"
                  onClick={() => toggle()}
                >
                  +
                </button>
              </>
            )}
          </Modal>
        </div>

        <table className="w-full">
          <tbody>
            <tr>
              <td colSpan={2}>
                <div>April 29, Wednesday</div>
              </td>
            </tr>
            <tr>
              <td>
                <div className="flex">
                  <div className="flex flex-shrink-0 items-center justify-center rounded-full overflow-hidden h-20 w-20">
                    <img
                      className="h-full w-auto"
                      src="img-1.jpg"
                      alt=""
                      style={{ maxWidth: 'unset' }}
                    />
                  </div>
                  <div className="flex justify-between px-4 w-full">
                    <div>
                      <div className="text-lg font-bold">Eating out</div>
                      <div className="text-gray-600">Cash</div>
                    </div>
                    <div>-5.50 BYN</div>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </PageTemplate>
  );
};

export { Transactions };
