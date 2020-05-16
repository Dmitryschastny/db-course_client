import React, { useState, useEffect } from 'react';
import { PageTemplate } from 'components/templates/PageTemplate';
import { Modal } from 'components/Modal';
import { AddTransactionForm } from 'components/AddTransactionForm';
import { Transaction } from 'services/TransactionsService';
import { clients } from 'services/clients.config';

const Transactions: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    clients.transactions.getAll().then(({ data }) => {
      setTransactions(data);
      setLoading(false);
    });
  }, []);

  const transactionsRows = transactions.map(t => (
    <>
      {/* <tr>
        <td colSpan={2}>
          <div>April 29, Wednesday</div>
        </td>
      </tr> */}
      <tr>
        <td>
          <div className="flex">
            <div
              className="flex flex-shrink-0 items-center 
                    justify-center rounded-full overflow-hidden h-12 w-12 border-solid border-2 border-black"
            >
              <i className="material-icons text-4xl">{t.category?.icon.name}</i>
            </div>
            <div className="flex justify-between px-4 w-full">
              <div>
                <div className="text-lg font-bold">{t.category?.name}</div>
                <div className="text-gray-600">{t.type.name}</div>
              </div>
              <div>{t.amount} BYN</div>
            </div>
          </div>
        </td>
      </tr>
    </>
  ));

  const pageContent = (
    <>
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
        <tbody>{transactionsRows}</tbody>
      </table>
    </>
  );

  return (
    <PageTemplate title="Transactions">
      <div className="flex flex-col md:w-1/2">{!loading && pageContent}</div>
    </PageTemplate>
  );
};

export { Transactions };
