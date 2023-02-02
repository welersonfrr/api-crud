import { Router } from "express";
import { TransactionController } from "../controllers/transaction.controller";
import { UserController } from "../controllers/user.controller";
import { ServerError } from "../messages/error/server.error";
import { CpfValidatorMiddleware } from "../middleware/cpf-validator.middleware";
import { TransactionValidatorMiddleware } from "../middleware/transaction-validator.middleware";
import { UserValidatorMiddleware } from "../middleware/user-validator.middleware";

const middlewareForCpf = [
  CpfValidatorMiddleware.cpfValidMiddleware,
  CpfValidatorMiddleware.cpfAlreadyExists,
];

const middlewareForCreateUser = [
  CpfValidatorMiddleware.cpfValidMiddleware,
  CpfValidatorMiddleware.cpfAlreadyExists,
  UserValidatorMiddleware.validateMandatoryMiddleware,
];

const middlewareForCreateTransaction = [
  TransactionValidatorMiddleware.validateMandatoryMiddleware,
];

// http://localhost:3333/user
export const userRoutes = () => {
  const app = Router();

  // GET http://localhost:3333/user
  app.get("/", new UserController().list);

  // GET http://localhost:3333/user/:id
  app.get("/:userId", new UserController().get);

  // POST http://localhost:3333/user/
  app.post("/", middlewareForCreateUser, new UserController().create);

  // PUT http://localhost:3333/user/:id
  app.put(
    "/:userId",
    [CpfValidatorMiddleware.cpfValidMiddleware],
    new UserController().update
  );

  // DELETE http://localhost:3333/user/:id
  app.delete("/:userId", new UserController().delete);

  // ****************

  // GET http://localhost:3333/user/:userId/transactions
  app.get("/:userId/transactions", new TransactionController().list);

  // GET http://localhost:3333/user/:userId/transactions/:id
  app.get("/:userId/transactions/:id", new TransactionController().get);

  // POST http://localhost:3333/user/:userId/transactions/:id
  app.post(
    "/:userId/transactions",
    middlewareForCreateTransaction,
    new TransactionController().create
  );

  // PUT http://localhost:3333/user/:userId/transactions/:id
  app.put("/:userId/transactions/:id", new TransactionController().update);

  // DELETE http://localhost:3333/user/:userId/transactions/:id
  app.delete("/:userId/transactions/:id", new TransactionController().delete);

  app.all("/*", (_, res) => {
    return ServerError.genericError(res, "Rota inválida");
  });

  return app;
};
