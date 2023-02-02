import { NextFunction, Request, Response } from "express";
import { RequestError } from "../messages/error/request.error";
import { ServerError } from "../messages/error/server.error";

export class TransactionValidatorMiddleware {
  public static validateMandatoryMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { title, value, type } = req.body;

      if (!title) {
        return RequestError.fieldNotProvided(res, "Title");
      }
      if (!value) {
        return RequestError.fieldNotProvided(res, "Value");
      }
      if (!type) {
        return RequestError.fieldNotProvided(res, "Type");
      }

      if (type.toString() != "income" && type != "outcome") {
        return res.status(400).send({
          ok: false,
          msg: `Type not like "income" or "outcome".`,
        });
      }

      next();
    } catch (err) {
      ServerError.genericError(res, err);
    }
  }
}
