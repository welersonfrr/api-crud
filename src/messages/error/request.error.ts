import { Response } from "express";

export class RequestError {
  public static fieldNotProvided(res: Response, field: string) {
    return res.status(400).send({
      ok: false,
      msg: `${field} was not provided`,
    });
  }

  public static dataNotFound(res: Response, data: string) {
    return res.status(404).send({
      ok: false,
      msg: `${data} not found.`,
    });
  }
}
