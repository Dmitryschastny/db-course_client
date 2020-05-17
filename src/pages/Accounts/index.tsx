import React, { useContext } from 'react';
import { PageTemplate } from 'components/templates/PageTemplate';
import { AddAccountForm } from 'components/AddAccountForm';
import { Modal } from 'components/Modal';
import { AppContext } from 'App';

const Accounts: React.FC = () => {
  const { accounts } = useContext(AppContext);

  const accountsRows = accounts.map(a => {
    const icon = a.type.id === 1 ? 'account_balance_wallet' : 'credit_card';

    return (
      <tr>
        <td className="pb-2">
          <Modal content={null}>
            {toggle => (
              <div className="flex action-item" onClick={() => toggle()}>
                <div className="flex flex-shrink-0 items-center justify-center rounded-full overflow-hidden h-12 w-12">
                  <i className="material-icons text-4xl">{icon}</i>
                </div>
                <div className="flex items-center justify-between px-4 w-full">
                  <div className="text-lg font-bold">{a.name}</div>
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

  return (
    <PageTemplate title="Accounts">
      <div className="flex flex-col md:w-1/2">
        <div className="flex items-center mb-2 justify-between">
          <Modal content={<AddAccountForm />}>
            {toggle => (
              <>
                <div className=" text-lg font-bold">Accounts</div>
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
        <table className="w-full mb-2">
          <tbody>{accountsRows}</tbody>
        </table>
      </div>
    </PageTemplate>
  );
};

export { Accounts };
