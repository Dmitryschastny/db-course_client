import React, { useState, useEffect } from 'react';
import { FormikConfig } from 'formik';
import { FormikSelect } from 'components/FormikSelect';
import { clients } from 'services/clients.config';
import { Bank } from 'services/BanksService';
import { useStrings } from 'hooks/useStrings';
import { AccountType } from 'services/AccountTypesService';
import { FormTemplate } from 'components/templates/FormTemplate';
import { FormikNumberInput } from 'components/FormikNumberInput';
import { Currency } from 'services/CurrenciesService';
import * as yup from 'yup';
import { stringEntries, StringEntries } from './constants';

interface FormikValues {
  accountTypeId: number;
  currencyId: number;
  bankId?: number;
  cardNumber?: number;
}

const AddAccountForm: React.FC = () => {
  const [banks, setBanks] = useState<Bank[]>([]);
  const [accountTypes, setAccountTypes] = useState<AccountType[]>([]);
  const [currencies, setCurrencies] = useState<Currency[]>([]);

  useEffect(() => {
    clients.banks.getAll().then(({ data }) => setBanks(data));
    clients.accountTypes.getAll().then(({ data }) => setAccountTypes(data));
    clients.currencies.getAll().then(({ data }) => setCurrencies(data));
  }, []);

  const strings = useStrings<StringEntries>(stringEntries);

  const formikConfig: FormikConfig<FormikValues> = {
    initialValues: {
      accountTypeId: 1,
      currencyId: 1,
    },
    onSubmit: async values => {
      console.log(values);
    },
    enableReinitialize: true,
    validationSchema: yup.object().shape({
      cardNumber: yup.string().when(['accountTypeId'], {
        is: accountTypeId => +accountTypeId === 2,
        then: yup
          .string()
          .length(16, 'Invalid input')
          .required('Required'),
      }),
    }),
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

  const currenciesOptions = currencies.map(c => (
    <option key={c.id} value={c.id}>
      {c.name} ({c.code})
    </option>
  ));

  return (
    <FormTemplate {...formikConfig}>
      {formik => {
        const cardFields = (
          <>
            <FormikSelect label={strings.bank} name="bankId">
              {banksOptions}
            </FormikSelect>

            <FormikNumberInput
              formik={formik}
              name="cardNumber"
              label="Number"
              format="#### #### #### ####"
              mask="_"
            />
          </>
        );

        console.log(formik)
        return (
          <>
            <FormikSelect label={strings.accountType} name="accountTypeId">
              {accountTypeOptions}
            </FormikSelect>

            <FormikSelect label="Currency" name="currencyId">
              {currenciesOptions}
            </FormikSelect>

            {+formik.values.accountTypeId === 2 && cardFields}

            <button className="mb-1 w-auto self-end" type="submit">
              {strings.add}
            </button>
          </>
        );
      }}
    </FormTemplate>
  );
};

export { AddAccountForm };
