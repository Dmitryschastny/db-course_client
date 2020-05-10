import React from 'react';

interface Props {
  title: string;
}

const PageTemplate: React.FC<Props> = ({ title, children }) => {
  return (
    <div className="p-10">
      <div className="text-3xl font-bold mb-8rem">{title}</div>
      {children}
    </div>
  );
};

export { PageTemplate };
