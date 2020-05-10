import React from 'react';
import { Formik, FormikConfig, Form } from 'formik';
import { clients } from 'services/clients.config';
import { FormikInput } from 'components/FormikInput';
import { Link } from 'react-router-dom';
import { PageTemplate } from 'components/templates/PageTemplate';
import { FormikSelect } from 'components/FormikSelect';
import { useStrings } from 'hooks/useStrings';
import { stringEntries, StringEntries } from './constants';

interface FormikValues {
  usePin: boolean;
  pin?: number;
  language: number;
  mainCurrency: number;
}

const Settings: React.FC = () => {
  const formikConfig: FormikConfig<FormikValues> = {
    initialValues: {
      usePin: false,
      language: 0,
      mainCurrency: 0,
    },
    onSubmit: async values => {
      console.log(values);
    },
  };

  const strings = useStrings<StringEntries>(stringEntries);

  return (
    <PageTemplate title="Settings">
      <div className="flex flex-col p-5 w-1/2">
        <Formik {...formikConfig}>
          {formik => (
            <Form className="flex flex-col">
              <FormikInput label="Use pin" type="checkbox" name="usePin" />
              {formik.values.usePin && <FormikInput label="Pin" name="pin" />}

              <FormikSelect label="Language" name="language">
                <option value="0">English</option>
              </FormikSelect>

              <FormikSelect label="Main currency" name="mainCurrency">
                <option value="0">BYN</option>
              </FormikSelect>

              <button className="mb-1 w-auto self-end" type="submit">
                {strings.save}
              </button>
            </Form>
          )}
        </Formik>
        {/* {requestError && (
            <div className="m-2 text-center text-red-600">{requestError}</div>
          )} */}
      </div>
    </PageTemplate>
  );
};

export { Settings };
