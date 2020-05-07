import React from 'react';
import { Link } from 'react-router-dom';
import { Field, Form, Formik, FormikConfig } from 'formik';
import { clients } from 'services/clients.config';

interface FormikValues {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formikConfig: FormikConfig<FormikValues> = {
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: values => {
      // clients.users.create(values);
    },
  };

  return (
    <div className="flex flex-col items-center h-full">
      <Formik {...formikConfig}>
        {formik => (
          <Form>
            <div className="flex flex-col mt-20 p-5 bg-gray-300">
              <div className="text-2xl mb-4">Sign in</div>

              <div className="flex justify-between mb-4">
                <label className="w-full mr-4" htmlFor="email">
                  Email
                </label>
                <Field id="email" type="email" name="email" />
              </div>
              <div className="flex justify-between mb-4">
                <label className="w-full mr-4" htmlFor="password">
                  Password
                </label>
                <Field id="password" type="password" name="password" />
              </div>
              <button className="mb-1" type="submit">
                Log in
              </button>
              <div className="text-right">
                <Link className="text-sm" to="/signup">
                  Create an account
                </Link>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export { SignIn };
