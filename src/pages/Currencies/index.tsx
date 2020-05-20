import React, { useContext, useState, useEffect } from 'react';
import { PageTemplate } from 'components/templates/PageTemplate';
import { AppContext } from 'App';
import { User } from 'services/UsersService/types';
import { clients } from 'services/clients.config';
import { Currency } from 'services/CurrenciesService';

const Currencies: React.FC = () => {
  // const { user, settings, onSettingsUpdate } = useContext(AppContext);

  const [currencies, setCurrencies] = useState<Currency[]>([]);

  useEffect(() => {
    clients.currencies.getAll().then(({ data }) => setCurrencies(data));
  }, []);

  const currenciesRows = currencies.map(c => (
    <tr key={c.id}>
      <td>{c.name}</td>
      <td>{c.code}</td>
    </tr>
  ));

  return (
    <PageTemplate title="Currencies">
      <div className="flex flex-col p-5 md:w-1/2">
        <table className="w-full">
          <tbody>{currenciesRows}</tbody>
        </table>
      </div>
    </PageTemplate>
  );
};

export { Currencies };
