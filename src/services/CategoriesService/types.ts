import { Icon } from '../IconsService/types';
import { TransactionType } from '../TransactionTypesService/types';

export type Category = {
  id: number;
  name: string;
  icon: Icon;
  transactionType: TransactionType;
};

export type CategoryResponse = Category;

export type CategoriesResponse = Category[];
