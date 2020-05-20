import React, { useContext } from 'react';
import { PageTemplate } from 'components/templates/PageTemplate';
import { AppContext } from 'App';

const Users: React.FC = () => {
  // const { user, settings, onSettingsUpdate } = useContext(AppContext);

  return (
    <PageTemplate title="Users">
      <div className="flex flex-col p-5 md:w-1/2">users</div>
    </PageTemplate>
  );
};

export { Users };
