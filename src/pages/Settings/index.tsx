import React, { useEffect, useState, useContext } from 'react';
import { Formik, FormikConfig, Form } from 'formik';
import { clients } from 'services/clients.config';
import { FormikInput } from 'components/FormikInput';
import { PageTemplate } from 'components/templates/PageTemplate';
import { FormikSelect } from 'components/FormikSelect';
import { useStrings } from 'hooks/useStrings';
import { Language } from 'services/LanguagesService';
import { Settings as FormikValues } from 'services/SettingsService';
import { AppContext } from 'App';
import { Currency } from 'services/CurrenciesService';
import { stringEntries, StringEntries } from './constants';

const Settings: React.FC = () => {
  const { user, settings, onSettingsUpdate } = useContext(AppContext);

  const [languages, setLanguages] = useState<Language[]>([]);
  const [currencies, setCurrencies] = useState<Currency[]>([]);

  const strings = useStrings<StringEntries>(stringEntries);

  useEffect(() => {
    clients.languages.getAll().then(({ data }) => setLanguages(data));
    clients.currencies.getAll().then(({ data }) => setCurrencies(data));
  }, []);

  if (!settings) {
    return null;
  }

  const formikConfig: FormikConfig<FormikValues> = {
    initialValues: {
      usePin: false,
      languageId: settings.language.id,
      mainCurrencyId: settings.mainCurrency.id,
    },
    onSubmit: async values => {
      if (user) {
        const language = languages.find(l => l.id === +values.languageId);
        const mainCurrency = currencies.find(
          c => c.id === +values.mainCurrencyId
        );

        if (language && mainCurrency) {
          await clients.users.update(user?.id, { settings: values });

          onSettingsUpdate({
            language,
            mainCurrency,
          });
        }
      }
    },
    enableReinitialize: true,
  };

  const languagesOptions = languages.map(l => (
    <option key={l.id} value={l.id}>
      {l.name}
    </option>
  ));

  const currenciesOptions = currencies.map(c => (
    <option key={c.id} value={c.id}>
      {c.name} ({c.code})
    </option>
  ));

  return (
    <PageTemplate title="Settings">
      <div className="flex flex-col p-5 md:w-1/2">
        <Formik {...formikConfig}>
          {formik => (
            <Form className="flex flex-col">
              <FormikInput label="Use pin" type="checkbox" name="usePin" />
              {formik.values.usePin && <FormikInput label="Pin" name="pin" />}

              <FormikSelect label="Language" name="languageId">
                {languagesOptions}
              </FormikSelect>

              <FormikSelect label="Main currency" name="mainCurrencyId">
                {currenciesOptions}
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
