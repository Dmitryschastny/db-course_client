import { AccountType } from '../AccountTypesService/types';
import { Currency } from '../CurrenciesService/types';

export type Account = {
  id: number;
  name?: string;
  balance: number;
  archived: boolean;
  card: any | null;
  currency: Currency;
  type: AccountType;
};

export type AccountsResponse = Account[];

export type CreateAccountRequest = {
  accountTypeId: number;
  currencyId: number;
  bankId?: number;
  cardNumber?: number;
};
