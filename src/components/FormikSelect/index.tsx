import React from 'react';
import { Field, ErrorMessage } from 'formik';

interface Props {
  label: string;
  name: string;
}

const FormikSelect: React.FC<Props> = ({ label, name, children }) => {
  return (
    <div className="flex justify-between mb-6">
      <label className="w-full mr-5" htmlFor={name}>
        {label}
      </label>
      <div className="relative">
        <div
          className="absolute text-red-600 text-sm"
          style={{ bottom: '100%' }}
        >
          <ErrorMessage name={name} />
        </div>
        <Field id={name} name={name} as="select">
          {children}
        </Field>
      </div>
    </div>
  );
};

export { FormikSelect };
