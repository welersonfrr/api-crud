import { Response } from "express";

export class ServerError {
  public static genericError(res: Response, err: any) {
    return res.status(500).send({
      ok: false,
      msg: err.toString(),
    });
  }
}
