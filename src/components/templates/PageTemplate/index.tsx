import React, { useState, useContext } from 'react';
import { Header } from 'components/Header';
import { AuthContext } from 'App';

interface Props {
  title?: string;
}

const PageTemplate: React.FC<Props> = ({ title, children }) => {
  const { authorized } = useContext(AuthContext);

  return (
    <>
      {authorized && <Header />}
      <div className="p-10">
        {title && <div className="text-3xl font-bold mb-8rem">{title}</div>}
        {children}
      </div>
    </>
  );
};

export { PageTemplate };
