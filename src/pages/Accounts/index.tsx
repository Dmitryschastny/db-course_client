import React, { useContext } from 'react';
import { PageTemplate } from 'components/templates/PageTemplate';
import { AddAccountForm } from 'components/AddAccountForm';
import { Modal } from 'components/Modal';
import { AppContext } from 'App';
import { EditAccountForm } from 'components/EditAccountForm';
import { useStrings } from 'hooks/useStrings';
import { StringEntries, stringEntries } from './constants';

const formatCardNumber = (number: string | number): string => {
  const firstPart = number.toString().slice(0, 4);
  const lastPart = number.toString().slice(12);

  return `${firstPart} #### #### ${lastPart}`;
};

const Accounts: React.FC = () => {
  const { accounts } = useContext(AppContext);

  const accountsRows = accounts.map(a => {
    const card = a.type.id === 2;
    const icon = card ? 'credit_card' : 'account_balance_wallet';

    return (
      <tr>
        <td className="pb-2">
          <Modal
            content={toggle => (
              <EditAccountForm
                onEdit={toggle}
                id={a.id}
                initialValues={{
                  name: a.name,
                  accountTypeId: a.type.id,
                  currencyId: a.currency.id,
                  bankId: a.card?.bank.id,
                  cardNumber: a.card ? +a.card.number : undefined,
                }}
              />
            )}
          >
            {toggle => (
              <div className="flex action-item" onClick={() => toggle()}>
                <div className="flex flex-shrink-0 items-center justify-center rounded-full overflow-hidden h-12 w-12">
                  <i className="material-icons text-4xl">{icon}</i>
                </div>
                <div className="flex items-center justify-between px-4 w-full">
                  <div className="text-lg font-bold">
                    <div>{a.name}</div>
                    {a.card && (
                      <div className="text-sm font-normal">
                        {a.card.bank.name}
                        <div>{formatCardNumber(a.card.number)}</div>
                      </div>
                    )}
                  </div>
                  <div>
                    {a.balance} {a.currency.code}
                  </div>
                </div>
              </div>
            )}
          </Modal>
        </td>
      </tr>
    );
  });

  const strings = useStrings<StringEntries>(stringEntries);

  return (
    <PageTemplate title={strings.pageTitle}>
      <div className="flex flex-col md:w-1/2">
        <div className="flex items-center mb-2 justify-between">
          <Modal content={toggle => <AddAccountForm onAdd={toggle} />}>
            {toggle => (
              <>
                <div className="text-lg font-bold">{strings.accountsList}</div>
                <button
                  type="button"
                  className="p-1 w-10 self-end"
                  onClick={() => toggle()}
                >
                  <i className="material-icons align-middle">add</i>
                </button>
              </>
            )}
          </Modal>
        </div>
        <table className="w-full mb-2">
          <tbody>{accountsRows}</tbody>
        </table>
      </div>
    </PageTemplate>
  );
};

export { Accounts };
