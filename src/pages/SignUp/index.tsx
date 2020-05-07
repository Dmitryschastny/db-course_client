import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Formik, FormikConfig } from 'formik';
import { clients } from 'services/clients.config';
import * as yup from 'yup';
import { FormikInput } from 'components/FormikInput';

interface FormikValues {
  email: string;
  password: string;
  repeatPassword: string;
}

const SignUp: React.FC = () => {
  const [requestError, setRequestError] = useState('');
  const [done, setDone] = useState(false);

  const formikConfig: FormikConfig<FormikValues> = {
    initialValues: {
      email: '',
      password: '',
      repeatPassword: '',
    },
    onSubmit: async values => {
      try {
        const { status } = await clients.users.create(values);

        if (status === 200) {
          setRequestError('');
          setDone(true);
        }
      } catch (error) {
        const { status } = error.response;

        if (status === 409) {
          setRequestError('User with this email already exists');
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
      repeatPassword: yup
        .mixed()
        .test('match', 'Passwords do not match', function(
          repeatPassword: string
        ) {
          return repeatPassword === this.parent.password;
        }),
    }),
  };

  const form = (
    <Formik {...formikConfig}>
      {formik => (
        <Form>
          <div className="text-2xl mb-4">Sign up</div>

          <FormikInput name="email" label="Email" type="email" />
          <FormikInput name="password" label="Password" type="password" />
          <FormikInput
            name="repeatPassword"
            label="Repeat Password"
            type="password"
          />

          <button className="mb-1 w-full" type="submit">
            Create an account
          </button>
          <div className="text-right">
            <Link className="text-sm" to="/signin">
              Login
            </Link>
          </div>
        </Form>
      )}
    </Formik>
  );

  const redirect = (
    <div>
      <div>You have succesfully created an account!</div>
      <div className="text-center">
        <Link className="text-sm" to="/signin">
          Now you can login
        </Link>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col items-center h-full">
      <div className="flex flex-col mt-20 p-5 bg-gray-300">
        {done ? redirect : form}
        {requestError && (
          <div className="m-2 text-center text-red-600">{requestError}</div>
        )}
      </div>
    </div>
  );
};

export { SignUp };
