import React from 'react';
import { Field, ErrorMessage } from 'formik';

interface Props {
  label: string;
  name: string;
}

const FormikTextarea: React.FC<Props> = ({ label, name }) => {
  return (
    <div className="flex flex-col justify-between mb-6">
      <label className="w-full mr-5 mb-2" htmlFor={name}>
        {label}
      </label>
      <div className="relative">
        <div
          className="absolute text-red-600 text-sm"
          style={{ bottom: '100%' }}
        >
          <ErrorMessage name={name} />
        </div>
        <Field className="w-full" id={name} as="textarea" name={name} />
      </div>
    </div>
  );
};

export { FormikTextarea };
