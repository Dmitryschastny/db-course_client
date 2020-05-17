import { Card } from '../CardsService/types';
import { AccountType } from '../AccountTypesService/types';
import { Currency } from '../CurrenciesService/types';

export type Account = {
  id: number;
  name?: string;
  balance: number;
  card?: Card;
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

export type CreateAccountResponse = Account;

export type UpdateAccountRequest = CreateAccountRequest;
export type UpdateAccountResponse = Account;
