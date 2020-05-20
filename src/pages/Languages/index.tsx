import React, { useContext, useState, useEffect } from 'react';
import { PageTemplate } from 'components/templates/PageTemplate';
import { AppContext } from 'App';
import { User } from 'services/UsersService/types';
import { clients } from 'services/clients.config';
import { Currency } from 'services/CurrenciesService';

const Languages: React.FC = () => {
  // const { user, settings, onSettingsUpdate } = useContext(AppContext);

  const [languages, setLanguages] = useState<Currency[]>([]);

  useEffect(() => {
    clients.languages.getAll().then(({ data }) => setLanguages(data));
  }, []);

  const languagesRows = languages.map(c => (
    <tr key={c.id}>
      <td>{c.name}</td>
      <td>{c.code}</td>
    </tr>
  ));

  return (
    <PageTemplate title="Languages">
      <div className="flex flex-col p-5 md:w-1/2">
        <table className="w-full">
          <tbody>{languagesRows}</tbody>
        </table>
      </div>
    </PageTemplate>
  );
};

export { Languages };
