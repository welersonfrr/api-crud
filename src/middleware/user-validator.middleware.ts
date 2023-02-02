import { NextFunction, Request, Response } from "express";
import { UserDatabase } from "../database/user.database";
import { RequestError } from "../messages/error/request.error";
import { ServerError } from "../messages/error/server.error";

export class UserValidatorMiddleware {
  public static validateMandatoryMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { name, cpf, email, age } = req.body;

      if (!name) {
        return RequestError.fieldNotProvided(res, "Name");
      }
      if (!cpf) {
        return RequestError.fieldNotProvided(res, "CPF");
      }
      if (!email) {
        return RequestError.fieldNotProvided(res, "E-mail");
      }
      if (!age) {
        return RequestError.fieldNotProvided(res, "Age");
      }

      next();
    } catch (err: any) {
      return ServerError.genericError(res, err);
    }
  }

  public static validateUserExistance(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { userId } = req.params;
    const db = new UserDatabase();
    const user = db.get(userId);

    try {
      if (user === undefined) {
        return RequestError.dataNotFound(res, "User");
      }

      next();
    } catch (err) {
      return ServerError.genericError(res, err);
    }
  }
}
