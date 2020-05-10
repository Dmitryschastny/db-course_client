import React from 'react';
import { PageTemplate } from 'components/templates/PageTemplate';

const NoMath: React.FC = () => (
  <PageTemplate title="404">
    <div className="mt-4">Requested page is not found</div>
  </PageTemplate>
);

export { NoMath };
