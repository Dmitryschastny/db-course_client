import React from 'react';
import { Field, ErrorMessage } from 'formik';

interface Props {
  label: string;
  name: string;
  type?: string;
}

const FormikInput: React.FC<Props> = ({ label, name, type }) => {
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
        <Field id={name} type={type || 'text'} name={name} />
      </div>
    </div>
  );
};

export { FormikInput };
