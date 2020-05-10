import React from 'react';
import { Header } from 'components/Header';

interface Props {
  title: string;
}

const PageTemplate: React.FC<Props> = ({ title, children }) => {
  return (
    <>
      <Header />
      <div className="p-10">
        <div className="text-3xl font-bold mb-8rem">{title}</div>
        {children}
      </div>
    </>
  );
};

export { PageTemplate };
