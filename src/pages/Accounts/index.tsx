import React, { useEffect, useState } from 'react';
import { PageTemplate } from 'components/templates/PageTemplate';
import { AddAccountForm } from 'components/AddAccountForm';
import { Modal } from 'components/Modal';
import { clients } from 'services/clients.config';
import { Account } from 'services/AccountsService';

const Accounts: React.FC = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);

  useEffect(() => {
    clients.accounts.getAll().then(({ data }) => setAccounts(data));
  }, []);

  const accountsRows = accounts.map(a => (
    <tr>
      <td>
        {a.name} ({a.type.name})
      </td>
      <td className="text-right">
        {a.balance} {a.currency.code}
      </td>
    </tr>
  ));

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
