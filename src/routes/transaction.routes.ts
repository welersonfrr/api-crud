import { Router } from "express";
import { TransactionController } from "../controllers/transaction.controller";
import { ServerError } from "../messages/error/server.error";

// http://localhost:3333/user/:userId/transactions
export const transactionRoutes = () => {
  const app = Router();

  // GET http://localhost:3333/user/:userId/transactions
  app.get("/", new TransactionController().list);

  // GET http://localhost:3333/user/:userId/transactions/:id
  app.get("/:id", new TransactionController().get);

  // PUT http://localhost:3333/user/:userId/transactions/:id
  app.put("/:id", new TransactionController().update);

  // DELETE http://localhost:3333/user/:userId/transactions/:id
  app.delete("/:id", new TransactionController().delete);

  app.all("/*", (_, res) => {
    return ServerError.genericError(res, "Rota inválida");
  });

  return app;
};
