import React, { useContext, useEffect, useState } from 'react';
import { FormikNumberInput } from 'components/FormikNumberInput';
import { FormTemplate } from 'components/templates/FormTemplate';
import { FormikConfig } from 'formik';
import { AppContext } from 'App';
import { useStrings } from 'hooks/useStrings';
import { FormikSelect } from 'components/FormikSelect';
import { clients } from 'services/clients.config';
import { TransactionType } from 'services/TransactionTypesService';
import { StringEntries, stringEntries } from './constants';

interface FormikValues {
  accountId: number;
  typeId: number;
  amount: number;
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

  useEffect(() => {
    clients.transactionTypes
      .getAll()
      .then(({ data }) => setTransactionTypes(data));
  }, []);

  const strings = useStrings<StringEntries>(stringEntries);

  const formikConfig: FormikConfig<FormikValues> = {
    initialValues: {
      accountId: 0,
      typeId: 0,
      amount: 0,
      date: 0,
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
          </>
        );
      }}
    </FormTemplate>
  );

  return form;
};

export { AddTransactionForm };
