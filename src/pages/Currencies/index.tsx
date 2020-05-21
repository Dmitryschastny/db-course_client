import React, { useState, useEffect } from 'react';
import { PageTemplate } from 'components/templates/PageTemplate';
import { clients } from 'services/clients.config';
import { Currency } from 'services/CurrenciesService';

const Currencies: React.FC = () => {
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
