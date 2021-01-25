import models from '../models';
const { User, Transaction, Account } = models;

const transactions = {
  async create({ body, decoded }, res, next) {
    try {
      const { amount, accountNumber } = body;
      const { userId } = decoded;

      const user = await User.findOne({ where: { id: userId } });
      const userAccount = await user.getAccount();

      const isForeignAccountSameAsUser =
        userAccount.accountNumber === parseInt(accountNumber, 10);

      if (isForeignAccountSameAsUser) {
        return res
          .status(400)
          .send({ error: 'Nice try. You cannot send yourself money' });
      }

      const foreignAccount = await Account.findOne({
        where: { accountNumber },
      });

      const newUserAccountBalance = userAccount.balance - amount;
      const newForeignAccountBalance = foreignAccount.balance + amount;

      if (!userAccount || !foreignAccount || newUserAccountBalance < 0) {
        return res.status(400).send({ error: 'Invalid transaction request' });
      }

      const { userId: accountId } = userAccount;
      const { accountNumber: foreignAccountNumber } = foreignAccount;

      await Transaction.create({
        amount,
        accountId,
        foreignAccountNumber,
      });

      const updatedUserAccount = await userAccount.update({
        balance: newUserAccountBalance,
      });
      await foreignAccount.update({
        balance: newForeignAccountBalance,
      });

      return res.status(201).send(updatedUserAccount);
    } catch (e) {
      return next(new Error(e));
    }
  },
  async getAll({ decoded }, res, next) {
    try {
      const { userId } = decoded;

      const user = await User.findOne({ where: { id: userId } });
      const userAccount = await user.getAccount();

      const myTransactions = await userAccount.getTransactions();

      return res.status(200).send(myTransactions);
    } catch (e) {
      return next(new Error(e));
    }
  },
};

export default transactions;
