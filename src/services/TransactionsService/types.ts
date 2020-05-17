import { Account } from 'services/AccountsService';
import { Place } from 'services/PlacesService';
import { TransactionType } from '../TransactionTypesService/types';
import { Category } from '../CategoriesService/types';

export type CreateTransactionRequest = {
  amount: number;
  typeId: number;
  accountId: number;
  date: number;
  note?: string;
  categoryId?: number;
  place?: string;
};

export type Transaction = {
  id: number;
  amount: number;
  note?: string;
  date: number;
  account: Account;
  category?: Category;
  // currency
  place: Place;
  type: TransactionType;
  // exchange rate
};

export type TransactionsResponse = Transaction[];

export type UpdateTransactionRequest = CreateTransactionRequest;
export type UpdateTransactionResponse = Transaction;
