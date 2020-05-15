import React, { useContext, useEffect, useState } from 'react';
import { FormikNumberInput } from 'components/FormikNumberInput';
import { FormTemplate } from 'components/templates/FormTemplate';
import { FormikConfig } from 'formik';
import { AppContext } from 'App';
import { useStrings } from 'hooks/useStrings';
import { FormikSelect } from 'components/FormikSelect';
import { clients } from 'services/clients.config';
import { TransactionType } from 'services/TransactionTypesService';
import { Account } from 'services/AccountsService';
import DatePicker from 'react-datepicker';
import { StringEntries, stringEntries } from './constants';
import 'react-datepicker/dist/react-datepicker.css';

interface FormikValues {
  amount: number;
  typeId: number;
  accountId: number;
  date: number;
  note?: string;
  categoryId?: number;
  placeId?: number;
}

const AddTransactionForm: React.FC = () => {
  const { settings } = useContext(AppContext);

  const [transactionTypes, setTransactionTypes] = useState<TransactionType[]>(
    []
  );
  const [accounts, setAccounts] = useState<Account[]>([]);

  useEffect(() => {
    clients.transactionTypes
      .getAll()
      .then(({ data }) => setTransactionTypes(data));
    clients.accounts.getAll().then(({ data }) => setAccounts(data));
  }, []);

  const strings = useStrings<StringEntries>(stringEntries);

  const formikConfig: FormikConfig<FormikValues> = {
    initialValues: {
      accountId: 0,
      typeId: 0,
      amount: 0,
      date: Date.now(),
    },
    onSubmit: async values => {
      console.log(values);
    },
    enableReinitialize: true,
  };

  const transactionTypesOptions = transactionTypes.map(t => (
    <option key={t.id} value={t.id}>
      {t.name}
    </option>
  ));

  const accountsOptions = accounts.map(a => (
    <option key={a.id} value={a.id}>
      {a.name}
    </option>
  ));

  const form = (
    <FormTemplate {...formikConfig}>
      {formik => {
        return (
          <>
            <FormikNumberInput
              formik={formik}
              name="amount"
              label={strings.fields.amount}
              suffix={` ${settings?.mainCurrency.code}`}
            />

            <FormikSelect label={strings.fields.transactionType} name="typeId">
              {transactionTypesOptions}
            </FormikSelect>

            <FormikSelect label={strings.fields.account} name="accountId">
              {accountsOptions}
            </FormikSelect>

            <div className="flex justify-between mb-6">
              <label className="w-full mr-5" htmlFor="date">
                {strings.fields.date}
              </label>
              <DatePicker
                id="date"
                selected={formik.values.date}
                withPortal
                onChange={date => {
                  if (date) {
                    formik.setFieldValue('date', +date);
                  }
                }}
              />
            </div>

            <button className="mb-1 w-auto self-end" type="submit">
              {strings.add}
            </button>
          </>
        );
      }}
    </FormTemplate>
  );

  return form;
};

export { AddTransactionForm };
