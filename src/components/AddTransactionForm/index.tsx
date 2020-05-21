import React, { useContext, useEffect, useState } from 'react';
import { FormikNumberInput } from 'components/FormikNumberInput';
import { FormTemplate } from 'components/templates/FormTemplate';
import { FormikConfig } from 'formik';
import { AppContext } from 'App';
import { useStrings } from 'hooks/useStrings';
import { FormikSelect } from 'components/FormikSelect';
import { clients } from 'services/clients.config';
import { TransactionType } from 'services/TransactionTypesService';
import DatePicker from 'react-datepicker';
import { Category, CategoriesResponse } from 'services/CategoriesService';
import { FormikTextarea } from 'components/FormikTextarea';
import { FormikInput } from 'components/FormikInput';
import {
  CreateTransactionRequest,
  Transaction,
} from 'services/TransactionsService';
import * as yup from 'yup';
import { StringEntries, stringEntries } from './constants';
import 'react-datepicker/dist/react-datepicker.css';

type FormikValues = CreateTransactionRequest;

interface Props {
  onAdd(transaction: Transaction): void;
}

const AddTransactionForm: React.FC<Props> = ({ onAdd }) => {
  const { accounts } = useContext(AppContext);

  const [transactionTypes, setTransactionTypes] = useState<TransactionType[]>(
    []
  );
  const [categories, setCategories] = useState<Category[]>([]);

  const [error, setError] = useState(false);

  useEffect(() => {
    Promise.all([
      clients.transactionTypes.getAll(),
      clients.categories.getAll(),
    ]).then(([{ data: transactionsData }, { data: categoriesData }]) => {
      setTransactionTypes(transactionsData);
      setCategories(categoriesData as CategoriesResponse);
    });
  }, []);

  const strings = useStrings<StringEntries>(stringEntries);

  if (!accounts.length) {
    return (
      <div>You don&apos;t have any accounts, please add an account first.</div>
    );
  }

  const formikConfig: FormikConfig<FormikValues> = {
    initialValues: {
      accountId: accounts.length ? accounts[0].id : 0,
      typeId: 1,
      amount: 0,
      date: Date.now(),
    },
    onSubmit: async values => {
      try {
        const { status, data } = await clients.transactions.create({
          ...values,
          typeId: +values.typeId,
          accountId: +values.accountId,
          categoryId: values.categoryId ? +values.categoryId : undefined,
        });

        if (status === 200) {
          setError(false);
          onAdd(data);
        }
      } catch (e) {
        // const { status } = e.response;

        setError(true);
      }
    },
    validationSchema: yup.object().shape({
      amount: yup
        .number()
        .moreThan(0, 'Value must be positive')
        .required('Required'),
    }),
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

  return (
    <FormTemplate {...formikConfig}>
      {formik => {
        const currentCategories = categories.filter(
          c => c.transactionType.id === +formik.values.typeId
        );

        const categoriesOptions = currentCategories.map(a => (
          <option key={a.id} value={a.id}>
            {a.name}
          </option>
        ));

        const showCategories =
          +formik.values.typeId === 1 || +formik.values.typeId === 2;

        let currentCategory;
        if (!showCategories) {
          delete formik.values.categoryId;
        } else if (categories.length) {
          currentCategory =
            currentCategories.find(c => c.id === +formik.values.categoryId) ||
            currentCategories[0];

          formik.values.categoryId = currentCategory.id;
        }

        const account = accounts.find(a => a.id === +formik.values.accountId);

        return (
          <>
            <FormikNumberInput
              allowNegative={false}
              formik={formik}
              name="amount"
              label={strings.fields.amount}
              suffix={` ${account?.currency.code}`}
            />

            <FormikSelect label={strings.fields.transactionType} name="typeId">
              {transactionTypesOptions}
            </FormikSelect>

            <FormikSelect label={strings.fields.account} name="accountId">
              {accountsOptions}
            </FormikSelect>

            {showCategories && (
              <>
                <FormikSelect
                  label={strings.fields.category}
                  name="categoryId"
                  icon={currentCategory?.icon.name}
                >
                  {categoriesOptions}
                </FormikSelect>
                <FormikInput name="place" label={strings.fields.place} />
              </>
            )}

            <FormikTextarea name="note" label={strings.fields.note} />

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

export { AddTransactionForm };
