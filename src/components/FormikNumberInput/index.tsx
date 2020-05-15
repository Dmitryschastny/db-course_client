import React from 'react';
import NumberFormat, { NumberFormatProps } from 'react-number-format';
import { FormikProps, ErrorMessage } from 'formik';

interface Props extends NumberFormatProps {
  formik: FormikProps<any>;
  name: string;
  label: string;
}

const FormikNumberInput: React.FC<Props> = ({
  formik,
  name,
  label,
  ...props
}) => {
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
        <NumberFormat
          id={name}
          isNumericString
          thousandSeparator
          value={formik.values[name]}
          allowEmptyFormatting
          onValueChange={v => formik.setFieldValue(name, v.floatValue)}
          onBlur={formik.handleBlur}
          {...props}
        />
      </div>
    </div>
  );
};
export { FormikNumberInput };
