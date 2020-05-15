import React from 'react';
import { Formik, Form, FormikConfig, FormikProps } from 'formik';

interface Props extends FormikConfig<any> {
  children(formik: FormikProps<any>): React.ReactNode;
}

const FormTemplate: React.FC<Props> = ({ children, ...formikConfig }) => {
  return (
    <div className="flex flex-col p-5 md:w-1/2">
      <Formik {...formikConfig}>
        {formik => <Form className="flex flex-col">{children(formik)}</Form>}
      </Formik>
    </div>
  );
};

export { FormTemplate };
