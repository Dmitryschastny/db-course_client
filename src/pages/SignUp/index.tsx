import React from 'react';
import { Link } from 'react-router-dom';
import { Field, Form, Formik, FormikConfig, ErrorMessage } from 'formik';
import { clients } from 'services/clients.config';
import * as yup from 'yup';
import { FormikInput } from 'components/FormikInput';

interface FormikValues {
  email: string;
  password: string;
  repeatPassword: string;
}

const SignUp: React.FC = () => {
  const formikConfig: FormikConfig<FormikValues> = {
    initialValues: {
      email: '',
      password: '',
      repeatPassword: '',
    },
    onSubmit: values => {
      clients.users.create(values);
    },
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .email('Invalid email')
        .required('Required'),
      password: yup
        .string()
        .min(6, 'Too Short!')
        .required('Required'),
    }),
  };

  return (
    <div className="flex flex-col items-center h-full">
      <Formik {...formikConfig}>
        {formik => (
          <Form>
            <div className="flex flex-col mt-20 p-5 bg-gray-300">
              <div className="text-2xl mb-4">Sign up</div>

              <FormikInput name="email" label="Email" type="email" />
              <FormikInput name="password" label="Password" type="password" />
              <FormikInput
                name="repeatPassword"
                label="Repeat Password"
                type="password"
              />

              <button className="mb-1" type="submit">
                Create an account
              </button>
              <div className="text-right">
                <Link className="text-sm" to="/signin">
                  Login
                </Link>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export { SignUp };
