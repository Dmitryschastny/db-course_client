import React, { useState, useEffect } from 'react';
import { PageTemplate } from 'components/templates/PageTemplate';
import { User } from 'services/UsersService/types';
import { clients } from 'services/clients.config';

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    clients.users.getAll().then(({ data }) => setUsers(data));
  }, []);

  const usersRows = users.map(u => (
    <tr key={u.id}>
      <td>{u.email}</td>
      <td>{u.role.name}</td>
    </tr>
  ));

  return (
    <PageTemplate title="Users">
      <div className="flex flex-col p-5 md:w-1/2">
        <table className="w-full">
          <tbody>{usersRows}</tbody>
        </table>
      </div>
    </PageTemplate>
  );
};

export { Users };
