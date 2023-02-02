import { Response } from "express";

export class RequestSuccess {
  public static genericDataObtained(res: Response, data: any) {
    return res.status(200).send({
      ok: true,
      msg: "Data successfully obtained.",
      data,
    });
  }

  public static dataCreated(res: Response, field: string, data: any) {
    return res.status(201).send({
      ok: true,
      msg: `${field} successfully created.`,
      data,
    });
  }

  public static dataUpdated(res: Response, field: string) {
    return res.status(200).send({
      ok: true,
      msg: `${field} successfully updated.`,
    });
  }

  public static dataDeleted(res: Response, field: string) {
    return res.status(200).send({
      ok: true,
      msg: `${field} successfully deleted.`,
    });
  }
}
