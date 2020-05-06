import React from 'react';
import 'styles/tailwind.css';

const App: React.FC = () => {
  return (
    <>
      <div className="flex">
        <div>МТБанк</div>
        <div>Приорбанк</div>
        <button>Connect a bank</button>
      </div>

      <div>CARDS AND ACCOUNTS</div>
    </>
  );
};

export { App };
