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
  UserValidatorMiddleware.validateUserExistance,
  TransactionValidatorMiddleware.validateMandatoryMiddleware,
];

const middlewareForValidateUserId = [
  UserValidatorMiddleware.validateUserExistance,
];

// http://localhost:3333/user
export const userRoutes = () => {
  const app = Router();

  // GET http://localhost:3333/user
  app.get("/", new UserController().list);

  // GET http://localhost:3333/user/:id
  app.get("/:userId", middlewareForValidateUserId, new UserController().get);

  // POST http://localhost:3333/user/
  app.post("/", middlewareForCreateUser, new UserController().create);

  // PUT http://localhost:3333/user/:id
  app.put(
    "/:userId",
    [
      UserValidatorMiddleware.validateUserExistance,
      CpfValidatorMiddleware.cpfValidMiddleware,
    ],
    new UserController().update
  );

  // DELETE http://localhost:3333/user/:id
  app.delete(
    "/:userId",
    middlewareForValidateUserId,
    new UserController().delete
  );

  // ****************

  // GET http://localhost:3333/user/:userId/transactions
  app.get(
    "/:userId/transactions",
    middlewareForValidateUserId,
    new TransactionController().list
  );

  // GET http://localhost:3333/user/:userId/transactions/:id
  app.get(
    "/:userId/transactions/:id",
    middlewareForValidateUserId,
    new TransactionController().get
  );

  // POST http://localhost:3333/user/:userId/transactions/:id
  app.post(
    "/:userId/transactions",
    middlewareForValidateUserId,
    middlewareForCreateTransaction,
    new TransactionController().create
  );

  // PUT http://localhost:3333/user/:userId/transactions/:id
  app.put(
    "/:userId/transactions/:id",
    middlewareForValidateUserId,
    new TransactionController().update
  );

  // DELETE http://localhost:3333/user/:userId/transactions/:id
  app.delete(
    "/:userId/transactions/:id",
    middlewareForValidateUserId,
    new TransactionController().delete
  );

  app.all("/*", (_, res) => {
    return ServerError.genericError(res, "Rota inválida");
  });

  return app;
};
