import React, { useState, useEffect } from 'react';
import { Form, Formik, FormikConfig } from 'formik';
import { FormikSelect } from 'components/FormikSelect';
import { clients } from 'services/clients.config';
import { Bank } from 'services/BanksService';
import { useStrings } from 'hooks/useStrings';
import { stringEntries, StringEntries } from './constants';

interface FormikValues {
  bankId?: number;
}

const AddBankForm: React.FC = () => {
  const [banks, setBanks] = useState<Bank[]>([]);

  useEffect(() => {
    clients.banks.getAll().then(({ data }) => setBanks(data));
  }, []);

  const strings = useStrings<StringEntries>(stringEntries);

  const formikConfig: FormikConfig<FormikValues> = {
    initialValues: {},
    onSubmit: async values => {},
  };

  const banksOptions = banks.map(b => (
    <option key={b.id} value={b.id}>
      {b.name} ({b.country.name})
    </option>
  ));

  return (
    <div className="flex flex-col p-5">
      <Formik {...formikConfig}>
        {formik => (
          <Form className="flex flex-col">
            <FormikSelect label={strings.bank} name="bankId">
              {banksOptions}
            </FormikSelect>

            <button className="mb-1 w-auto self-end" type="submit">
              {strings.add}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export { AddBankForm };
