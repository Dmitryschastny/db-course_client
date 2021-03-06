import React, { useState, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Form, Formik, FormikConfig } from 'formik';
import { clients } from 'services/clients.config';
import * as yup from 'yup';
import { FormikInput } from 'components/FormikInput';
import { AuthContext } from 'App';
import { Paths } from 'routes';

interface FormikValues {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const { onAuth, authorized } = useContext(AuthContext);

  const [requestError, setRequestError] = useState('');

  const formikConfig: FormikConfig<FormikValues> = {
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async values => {
      const { email, password } = values;

      try {
        const {
          status,
          data: { token },
        } = await clients.users.auth({ email, password });

        if (status === 200) {
          onAuth(token);
        }
      } catch (error) {
        const { status } = error.response;

        if (status === 401) {
          setRequestError('Email or password is invalid');
        }

        if (status === 400) {
          setRequestError('Unknown error');
        }
      }
    },
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .email('Invalid email')
        .required('Required'),
      password: yup
        .string()
        .min(6, 'Too Short')
        .required('Required'),
    }),
  };

  if (authorized) {
    return <Redirect to={{ pathname: Paths.HOME }} />;
  }

  return (
    <div className="flex flex-col items-center h-full">
      <div className="flex flex-col mt-20 p-5">
        <Formik {...formikConfig}>
          {formik => (
            <Form>
              <div className="text-3xl font-bold mb-4">Sign up</div>

              <FormikInput name="email" label="Email" type="email" />
              <FormikInput name="password" label="Password" type="password" />

              <button className="mb-1 w-full" type="submit">
                Login
              </button>
              <div className="text-right">
                <Link className="text-sm" to="/signup">
                  Create an account
                </Link>
              </div>
            </Form>
          )}
        </Formik>
        {requestError && (
          <div className="m-2 text-center text-red-600">{requestError}</div>
        )}
      </div>
    </div>
  );
};

export { SignIn };
