import React, { useContext } from 'react';
import { AuthContext } from 'App';
import { useStrings } from 'hooks/useStrings';
import { Navigation } from 'components/Navigation';
import { StringEntries, stringEntries } from './constants';

const Header: React.FC = () => {
  const { onLogout } = useContext(AuthContext);

  const strings = useStrings<StringEntries>(stringEntries);

  return (
    <div className="px-10 pt-4">
      <div className="flex justify-between mb-4">
        <Navigation />
        <button type="button" onClick={onLogout}>
          {strings.logout}
        </button>
      </div>
      <div className="text-xl font-bold">275 BYN</div>
      <div className="text-sm text-grey">Balance</div>
    </div>
  );
};

export { Header };
