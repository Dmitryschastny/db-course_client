import React, { useState, useEffect } from 'react';
import { FormikConfig } from 'formik';
import { FormikSelect } from 'components/FormikSelect';
import { clients } from 'services/clients.config';
import { Bank } from 'services/BanksService';
import { useStrings } from 'hooks/useStrings';
import { AccountType } from 'services/AccountTypesService';
import { FormTemplate } from 'components/templates/FormTemplate';
import { stringEntries, StringEntries } from './constants';

interface FormikValues {
  accountTypeId: number;
  bankId?: number;
}

const AddAccountForm: React.FC = () => {
  const [banks, setBanks] = useState<Bank[]>([]);
  const [accountTypes, setAccountTypes] = useState<AccountType[]>([]);

  useEffect(() => {
    clients.banks.getAll().then(({ data }) => setBanks(data));
    clients.accountTypes.getAll().then(({ data }) => setAccountTypes(data));
  }, []);

  const strings = useStrings<StringEntries>(stringEntries);

  const formikConfig: FormikConfig<FormikValues> = {
    initialValues: {
      accountTypeId: 1,
    },
    onSubmit: async values => {
      console.log(values);
    },
    enableReinitialize: true,
  };

  const accountTypeOptions = accountTypes.map(b => (
    <option key={b.id} value={b.id}>
      {b.name}
    </option>
  ));

  const banksOptions = banks.map(b => (
    <option key={b.id} value={b.id}>
      {b.name} ({b.country.name})
    </option>
  ));

  return (
    <FormTemplate {...formikConfig}>
      {formik => (
        <>
          <FormikSelect label={strings.accountType} name="accountTypeId">
            {accountTypeOptions}
          </FormikSelect>

          {+formik.values.accountTypeId === 2 && (
            <FormikSelect label={strings.bank} name="bankId">
              {banksOptions}
            </FormikSelect>
          )}

          <button className="mb-1 w-auto self-end" type="submit">
            {strings.add}
          </button>
        </>
      )}
    </FormTemplate>
  );
};

export { AddAccountForm };
