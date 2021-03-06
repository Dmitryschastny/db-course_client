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
import {
  CommonStringEntries,
  commonStringEntries,
} from 'constants/localization';
import { AppContext } from 'App';
import { stringEntries, StringEntries } from './constants';

interface FormikValues {
  name: string;
  accountTypeId: number;
  currencyId: number;
  bankId?: number;
  cardNumber?: number;
}

interface Props {
  onAdd?(): void;
}

const AddAccountForm: React.FC<Props> = ({ onAdd }) => {
  const { accounts, onAccountsUpdate } = useContext(AppContext);

  const [banks, setBanks] = useState<Bank[]>([]);
  const [accountTypes, setAccountTypes] = useState<AccountType[]>([]);
  const [currencies, setCurrencies] = useState<Currency[]>([]);

  const [error, setError] = useState(false);

  useEffect(() => {
    clients.banks.getAll().then(({ data }) => setBanks(data));
    clients.accountTypes.getAll().then(({ data }) => setAccountTypes(data));
    clients.currencies.getAll().then(({ data }) => setCurrencies(data));
  }, []);

  const strings = useStrings<StringEntries>(stringEntries);
  const commonStrings = useStrings<CommonStringEntries>(commonStringEntries);

  const formikConfig: FormikConfig<FormikValues> = {
    initialValues: {
      name: '',
      accountTypeId: 1,
      currencyId: 1,
    },
    onSubmit: async values => {
      try {
        const { status, data } = await clients.accounts.create({
          ...values,
          accountTypeId: +values.accountTypeId,
          currencyId: +values.currencyId,
          bankId: values.bankId ? +values.bankId : undefined,
        });

        if (status === 200) {
          setError(false);

          onAccountsUpdate([...accounts, data]);
        }

        if (onAdd) {
          onAdd();
        }
      } catch (e) {
        // const { status } = e.response;

        setError(true);
      }
    },
    enableReinitialize: true,
    validationSchema: yup.object().shape({
      name: yup.string().required(commonStrings.required),
      cardNumber: yup.string().when(['accountTypeId'], {
        is: accountTypeId => +accountTypeId === 2,
        then: yup
          .string()
          .length(16, 'Invalid input')
          .required(commonStrings.required),
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

        return (
          <>
            <FormikInput name="name" label={strings.accountName} />

            <FormikSelect label={strings.accountType} name="accountTypeId">
              {accountTypeOptions}
            </FormikSelect>

            <FormikSelect label={strings.currency} name="currencyId">
              {currenciesOptions}
            </FormikSelect>

            {+formik.values.accountTypeId === 2 && cardFields}

            <button className="mb-1 w-auto self-end" type="submit">
              {strings.add}
            </button>

            {error && (
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

export { AddAccountForm };
