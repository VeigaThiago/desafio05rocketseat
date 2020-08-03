import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction, { TransactionDTO } from '../models/Transaction';

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: TransactionDTO): Transaction {
    if (type !== `income` && type !== `outcome`){
      throw new Error(`Transaction's Type Invalids`);
    }

    const { total } = this.transactionsRepository.getBalance();

    if (type === `outcome` && total < parseInt(value)) {
      throw new Error(`You don´t have enough balance in your account`);
    }

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    return transaction;

  }
}

export default CreateTransactionService;
