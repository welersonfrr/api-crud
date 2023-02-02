import { Request, Response } from "express";
import { UserDatabase } from "../database/user.database";
import { RequestError } from "../messages/error/request.error";
import { RequestSuccess } from "../messages/success/request.success";
import { ServerError } from "../messages/error/server.error";
import { Transaction } from "../models/transaction.model";

export class TransactionController {
  // list all transaction of a user
  public list(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const { title, type } = req.query;
      const db = new UserDatabase();
      const user = db.get(userId);
      let result;
      let income, outcome, total;

      //   tratamento para caso não for encontrado usuário
      if (user === undefined) {
        return RequestError.dataNotFound(res, "User");
      }

      result = user.transactionsList();

      if (title) {
        result.transactions = result.transactions?.filter((transaction) => {
          return transaction.title === title;
        });
      }

      if (type) {
        result.transactions = result.transactions?.filter((transaction) => {
          return transaction.type === type;
        });
      }

      income = result.transactions
        ?.filter((transaction) => transaction.type == "income")
        .reduce((prev, transaction) => {
          return prev + transaction.value;
        }, 0);

      outcome = result.transactions
        ?.filter((transaction) => transaction.type == "outcome")
        .reduce((prev, transaction) => {
          return prev + transaction.value;
        }, 0);

      total = (income ?? 0) - (outcome ?? 0);

      result.balance = {
        income,
        outcome,
        total,
      };

      res.status(200).send({
        ok: true,
        msg: "Listing Transactions",
        data: result,
      });
    } catch (err) {
      return ServerError.genericError(res, err);
    }
  }

  // get one transaction by id
  public get(req: Request, res: Response) {
    try {
      const { userId, id } = req.params;
      const db = new UserDatabase();
      const user = db.get(userId);
      let result;

      //   tratamento para caso não for encontrado usuário
      if (user === undefined) {
        return RequestError.dataNotFound(res, "User");
      }

      result = user
        .transactionsList()
        .transactions?.find((transaction) => transaction.id === id);

      if (!result) {
        return RequestError.dataNotFound(res, "Transaction");
      }

      res.status(200).send({
        ok: true,
        msg: "Showing Transaction",
        data: result,
      });
    } catch (err) {
      return ServerError.genericError(res, err);
    }
  }

  // Create an transaction
  public create(req: Request, res: Response) {
    const { userId } = req.params;
    const { title, value, type } = req.body;
    const db = new UserDatabase();
    const user = db.get(userId);
    let data;

    //   tratamento para caso não for encontrado usuário
    if (user === undefined) {
      return RequestError.dataNotFound(res, "User");
    }

    data = new Transaction(title, value, type);
    user.transactions.push(data);

    RequestSuccess.dataCreated(res, "Transaction", data);

    try {
    } catch (err) {
      return ServerError.genericError(res, err);
    }
  }

  // update an transaction
  public update(req: Request, res: Response) {
    try {
      const { userId, id } = req.params;
      const { title, value, type } = req.body;

      const db = new UserDatabase();
      const user = db.get(userId);
      let result;

      //   tratamento para caso não for encontrado usuário
      if (user === undefined) {
        return RequestError.dataNotFound(res, "User");
      }

      result = user
        .transactionsList()
        .transactions?.find((transaction) => transaction.id === id);

      if (!result) {
        return RequestError.dataNotFound(res, "Transaction");
      }

      if (title) {
        result.title = title;
      }

      if (value) {
        result.value = value;
      }

      if (type) {
        result.type = type;
      }

      res.status(200).send({
        ok: true,
        msg: "Transaction successfully updated.",
      });
    } catch (err) {
      return ServerError.genericError(res, err);
    }
  }

  // Delete a transaction
  public delete(req: Request, res: Response) {
    try {
      const { userId, id } = req.params;
      const db = new UserDatabase();
      const user = db.get(userId);

      if (!user) {
        return res.status(404).send({
          ok: false,
          msg: "User not found.",
        });
      }

      const transaction = user.transactions.find(
        (transaction) => transaction.id === id
      );

      if (!transaction) {
        return RequestError.dataNotFound(res, "Transaction");
      }

      const indexTransaction = user.transactions.findIndex(
        (transaction) => transaction.id === id
      );

      user.transactions.splice(indexTransaction, 1);

      res.status(200).send({
        ok: true,
        msg: "Transaction successfully deleted.",
      });
    } catch (err) {
      return ServerError.genericError(res, err);
    }
  }
}
