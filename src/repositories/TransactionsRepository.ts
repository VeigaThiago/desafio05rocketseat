import Transaction,{ TransactionDTO, FinalTransaction } from '../models/Transaction'

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): FinalTransaction {
    const balance = this.getBalance();
    return {
      transactions: this.transactions,
      balance
    };
  }

  public getBalance(): Balance {

    const filteredIncome = this.transactions.filter((transaction) => {
      return transaction.type === 'income';
    })

    const filteredOutcome = this.transactions.filter((transaction) => {
      return transaction.type === 'outcome';
    })

    const totalIncome = filteredIncome.reduce( (accumulator1, elem) => {
      return accumulator1 += elem.value
    }, 0)

    const totalOutcome = filteredOutcome.reduce( (accumulator2, elem) => {
      return accumulator2 += elem.value
    }, 0)

    return {
      income: totalIncome,
      outcome: totalOutcome,
      total: totalIncome - totalOutcome,
    }

  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    const transaction = new Transaction({ title, value: parseInt(value), type });

    this.transactions.push(transaction);

    return transaction;
  }

}

export default TransactionsRepository;
