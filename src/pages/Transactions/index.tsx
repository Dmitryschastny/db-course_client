import React, { useState, useEffect, useContext } from 'react';
import { PageTemplate } from 'components/templates/PageTemplate';
import { Modal } from 'components/Modal';
import { AddTransactionForm } from 'components/AddTransactionForm';
import { Transaction } from 'services/TransactionsService';
import { clients } from 'services/clients.config';
import { AppContext } from 'App';

const Transactions: React.FC = () => {
  const { settings } = useContext(AppContext);

  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    clients.transactions.getAll().then(({ data }) => {
      setTransactions(data);
      setLoading(false);
    });
  }, []);

  let lastDate = transactions.length
    ? new Date(transactions[0].date)
    : new Date();
  const transactionsRows = transactions.map((t, i) => {
    const date = new Date(t.date);

    const showDate =
      date.getDate() < lastDate.getDate() ||
      date.getMonth() < lastDate.getMonth() ||
      date.getFullYear() < lastDate.getFullYear() ||
      i === 0;

    if (showDate) {
      lastDate = date;
    }

    const formattedDate = date.toLocaleString(settings?.language.code || 'en', {
      month: 'long',
      year: 'numeric',
      day: 'numeric',
    });

    return (
      <>
        {showDate && (
          <tr>
            <td className="pb-2" colSpan={2}>
              <div className="border-b"> {showDate && formattedDate}</div>
            </td>
          </tr>
        )}
        <tr>
          <td className="pb-2">
            <div className="flex">
              <div
                className="flex flex-shrink-0 items-center 
                    justify-center rounded-full overflow-hidden h-12 w-12 border-solid border-2 border-black"
              >
                <i className="material-icons text-4xl">
                  {t.category?.icon.name}
                </i>
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
    );
  });

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
