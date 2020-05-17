import React, { useState, useEffect, useContext } from 'react';
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
import { FormikInput } from 'components/FormikInput';
import { AppContext } from 'App';
import { stringEntries, StringEntries } from './constants';

interface FormikValues {
  name?: string;
  balance: number;
  accountTypeId: number;
  currencyId: number;
  bankId?: number;
  cardNumber?: number;
}

interface Props {
  id: number;
  initialValues: FormikValues;
  onEdit?(): void;
}

const EditAccountForm: React.FC<Props> = ({ id, initialValues, onEdit }) => {
  const { accounts, onAccountsUpdate } = useContext(AppContext);

  const [banks, setBanks] = useState<Bank[]>([]);
  const [accountTypes, setAccountTypes] = useState<AccountType[]>([]);
  const [currencies, setCurrencies] = useState<Currency[]>([]);

  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    clients.banks.getAll().then(({ data }) => setBanks(data));
    clients.accountTypes.getAll().then(({ data }) => setAccountTypes(data));
    clients.currencies.getAll().then(({ data }) => setCurrencies(data));
  }, []);

  const strings = useStrings<StringEntries>(stringEntries);

  const handleDelete = async () => {
    try {
      const { status } = await clients.accounts.delete(id);

      if (status === 204) {
        const accountIndex = accounts.findIndex(a => a.id === id);
        const updatedAccounts = [
          ...accounts.slice(0, accountIndex),
          ...accounts.slice(accountIndex + 1),
        ];

        onAccountsUpdate(updatedAccounts);

        if (onEdit) {
          onEdit();
        }
      }
    } catch (error) {
      setErrorMessage(strings.error);
    }
  };

  const formikConfig: FormikConfig<FormikValues> = {
    initialValues,
    onSubmit: async values => {
      try {
        const { status, data } = await clients.accounts.update(id, {
          ...values,
          accountTypeId: +values.accountTypeId,
          currencyId: +values.currencyId,
          bankId: values.bankId ? +values.bankId : undefined,
        });

        if (status === 200) {
          const accountIndex = accounts.findIndex(a => a.id === id);
          const updatedAccounts = [...accounts];
          updatedAccounts[accountIndex] = data;

          onAccountsUpdate(updatedAccounts);

          if (onEdit) {
            onEdit();
          }
        }
      } catch (e) {
        const { status } = e.response;

        setErrorMessage(strings.error);
      }
    },
    enableReinitialize: true,
    validationSchema: yup.object().shape({
      name: yup.string().required('Required'),
      cardNumber: yup.string().when(['accountTypeId'], {
        is: accountTypeId => +accountTypeId === 2,
        then: yup
          .string()
          .length(16, 'Invalid input')
          .required('Required'),
      }),
      balance: yup.number().required('Required'),
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

        return (
          <>
            <FormikInput name="name" label="Account name" />

            <FormikNumberInput formik={formik} name="balance" label="Balance" />

            <FormikSelect label={strings.accountType} name="accountTypeId">
              {accountTypeOptions}
            </FormikSelect>

            <FormikSelect label="Currency" name="currencyId">
              {currenciesOptions}
            </FormikSelect>

            {+formik.values.accountTypeId === 2 && cardFields}

            <div className="flex justify-between">
              <button
                className="mb-1 w-auto self-end"
                type="button"
                onClick={handleDelete}
              >
                {strings.delete}
              </button>
              <button className="mb-1 w-auto self-end" type="submit">
                {strings.save}
              </button>
            </div>

            {errorMessage && (
              <div className="m-2 text-center text-red-600">
                {strings.error}
              </div>
            )}
          </>
        );
      }}
    </FormTemplate>
  );
};

export { EditAccountForm };
