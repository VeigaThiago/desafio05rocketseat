import { uuid } from 'uuidv4';

export interface TransactionDTO {
  title: string;
  value: string;
  type: 'income' | 'outcome';
}

export interface FinalTransaction{
  transactions: Transaction[];
  balance: {
    income: number;
    outcome: number;
    total: number;
  };
}

class Transaction {
  id: string;

  title: string;

  value: number;

  type: 'income' | 'outcome';

  constructor({ title, value, type }: Omit<Transaction, 'id'>) {
    this.id = uuid();
    this.title = title;
    this.value = value;
    this.type = type;
  }
}

export default Transaction;
