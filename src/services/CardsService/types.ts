import { Bank } from '../BanksService/types';

export type Card = {
  id: number;
  bank: Bank;
  number: string;
};
