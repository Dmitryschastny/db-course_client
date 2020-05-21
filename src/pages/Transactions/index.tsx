import React, { useState, useEffect, useContext } from 'react';
import { PageTemplate } from 'components/templates/PageTemplate';
import { Modal } from 'components/Modal';
import { AddTransactionForm } from 'components/AddTransactionForm';
import { Transaction } from 'services/TransactionsService';
import { clients } from 'services/clients.config';
import { AppContext } from 'App';
import { EditTransactionForm } from 'components/EditTransactionForm';
import { CSVLink } from 'react-csv';
import { useStrings } from 'hooks/useStrings';
import { StringEntries, stringEntries } from './constants';

const Transactions: React.FC = () => {
  const { accounts, settings } = useContext(AppContext);

  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (accounts.length) {
      clients.transactions.getAll().then(({ data }) => {
        setTransactions(data);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  const handleTransactionEdit = (transaction: Transaction) => {
    const updatedTransactions = [...transactions];
    const transactionIndex = updatedTransactions.findIndex(
      t => t.id === transaction.id
    );

    updatedTransactions[transactionIndex] = transaction;
    updatedTransactions.sort((a, b) => a.date - b.date);

    setTransactions(updatedTransactions);
  };

  const handleTransactionAdd = (transaction: Transaction) => {
    setTransactions([...transactions, transaction]);
  };

  const handleTransactionDelete = (id: number) => {
    const transactionIndex = transactions.findIndex(t => t.id === id);
    const updatedTransactions = [
      ...transactions.slice(0, transactionIndex),
      ...transactions.slice(transactionIndex + 1),
    ];

    setTransactions(updatedTransactions);
  };

  const strings = useStrings<StringEntries>(stringEntries);

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

    const formattedDate = date.toLocaleString(settings.language.code, {
      month: 'long',
      year: 'numeric',
      day: 'numeric',
    });

    const minus = t.type.id === 1;
    const plus = t.type.id === 2;
    let amountClass = minus ? 'text-red-600' : '';
    amountClass = plus ? 'text-green-600' : amountClass;

    return (
      <React.Fragment key={t.id}>
        {showDate && (
          <tr>
            <td className="pb-2" colSpan={2}>
              <div className="border-b"> {showDate && formattedDate}</div>
            </td>
          </tr>
        )}
        <tr>
          <td>
            <Modal
              content={toggle => (
                <EditTransactionForm
                  id={t.id}
                  initialValues={{
                    amount: t.amount,
                    typeId: t.type.id,
                    accountId: t.account.id,
                    date: +new Date(t.date),
                    note: t.note,
                    categoryId: t.category?.id,
                    place: t.place?.name,
                  }}
                  onEdit={transaction => {
                    handleTransactionEdit(transaction);
                    toggle();
                  }}
                  onDelete={() => {
                    handleTransactionDelete(t.id);
                    toggle();
                  }}
                />
              )}
            >
              {toggle => (
                <div className="flex action-item p-2" onClick={() => toggle()}>
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
                      <div className="text-lg font-bold">
                        {t.category?.name}
                      </div>
                      <div className="text-gray-600">{t.account.name}</div>
                    </div>
                    <div className={amountClass}>
                      {minus && '-'}
                      {plus && '+'}
                      {t.amount} {t.account.currency.code}
                    </div>
                  </div>
                </div>
              )}
            </Modal>
          </td>
        </tr>
      </React.Fragment>
    );
  });

  const exportData = transactions.map(t => [
    // t.account.name,
    // t.amount,
    // t.category?.name,
    // t.date,
    // t.note,
    // t.place.name,
    // t.type.name,
  ]);

  const pageContent = (
    <>
      <div className="flex items-center mb-2 justify-between">
        <div className="text-lg font-bold">{strings.transactionsList}</div>
        <div>
          <Modal
            content={toggle => (
              <AddTransactionForm
                onAdd={transaction => {
                  handleTransactionAdd(transaction);
                  toggle();
                }}
              />
            )}
          >
            {toggle => (
              <button
                type="button"
                className="p-1 w-10 self-end mr-4"
                onClick={() => toggle()}
              >
                <i className="material-icons align-middle">add</i>
              </button>
            )}
          </Modal>
          <Modal content={strings.exportError}>
            {toggle => (
              <button
                type="button"
                className="p-1 w-10 self-end"
                onClick={() => {
                  if (!exportData.length) {
                    toggle();
                  }
                }}
              >
                {exportData.length ? (
                  <CSVLink data={exportData}>
                    <i className="material-icons align-middle">import_export</i>
                  </CSVLink>
                ) : (
                  <i className="material-icons align-middle">import_export</i>
                )}
              </button>
            )}
          </Modal>
        </div>
      </div>

      <table className="w-full">
        <tbody>{transactionsRows}</tbody>
      </table>
    </>
  );

  return (
    <PageTemplate title={strings.pageTitle}>
      <div className="flex flex-col md:w-1/2">{!loading && pageContent}</div>
    </PageTemplate>
  );
};

export { Transactions };
