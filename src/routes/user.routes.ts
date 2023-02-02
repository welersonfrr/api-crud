import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { ServerError } from "../messages/error/server.error";
import { CpfValidatorMiddleware } from "../middleware/cpf-validator.middleware";
import { UserValidatorMiddleware } from "../middleware/user-validator.middleware";

const middlewareForCpf = [
  CpfValidatorMiddleware.cpfValidMiddleware,
  CpfValidatorMiddleware.cpfAlreadyExists,
];

const middlewareForCreate = [
  CpfValidatorMiddleware.cpfValidMiddleware,
  CpfValidatorMiddleware.cpfAlreadyExists,
  UserValidatorMiddleware.validateMandatoryMiddleware,
];

// http://localhost:3333/user
export const userRoutes = () => {
  const app = Router();

  // GET http://localhost:3333/user
  app.get("/", new UserController().list);

  // GET http://localhost:3333/user/:id
  app.get("/:userId", new UserController().get);

  // POST http://localhost:3333/user/
  app.post("/", middlewareForCreate, new UserController().create);

  // PUT http://localhost:3333/user/:id
  app.put(
    "/:userId",
    [CpfValidatorMiddleware.cpfValidMiddleware],
    new UserController().update
  );

  // DELETE http://localhost:3333/user/:id
  app.delete("/:userId", new UserController().delete);

  app.all("/*", (_, res) => {
    return ServerError.genericError(res, "Rota inválida");
  });

  return app;
};
