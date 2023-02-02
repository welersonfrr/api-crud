import { Request, Response } from "express";
import { UserDatabase } from "../database/user.database";
import { RequestError } from "../messages/error/request.error";
import { ServerError } from "../messages/error/server.error";
import { RequestSuccess } from "../messages/success/request.success";
import { User } from "../models/user.model";

export class UserController {
  // list users without transactions
  public list(req: Request, res: Response) {
    try {
      const { name, email, cpf } = req.query;
      const database = new UserDatabase();
      let users = database.list();

      if (name) {
        users = users.filter((user) => {
          return user.name === name;
        });
      }
      if (email) {
        users = users.filter((user) => {
          return user.email === email;
        });
      }
      if (cpf) {
        users = users.filter((user) => {
          return user.cpf === cpf;
        });
      }

      const result = users.map((user) => user.simpleUserToJson());

      RequestSuccess.genericDataObtained(res, result);
    } catch (err) {
      return ServerError.genericError(res, err);
    }
  }

  //   list user by id
  public get(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const database = new UserDatabase();
      const user = database.get(userId);
      let result;

      //   se encontra usuário converte para json
      if (user) {
        result = user.toJson();
      }

      RequestSuccess.genericDataObtained(res, result);
    } catch (err) {
      return ServerError.genericError(res, err);
    }
  }

  // Create new user
  public create(req: Request, res: Response) {
    try {
      const { name, cpf, email, age } = req.body;
      const user = new User(name, cpf, email, Number(age));
      const db = new UserDatabase();
      let data;

      db.create(user);
      data = user.simpleUserToJson();

      RequestSuccess.dataCreated(res, "User", data);
    } catch (err) {
      return ServerError.genericError(res, err);
    }
  }

  // Update a user
  public update(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const { name, cpf, email, age } = req.body;
      const db = new UserDatabase();
      const selectedUser = db.get(userId);

      if (!selectedUser) {
        return RequestError.dataNotFound(res, "User");
      }

      if (name) {
        selectedUser.name = name;
      }
      if (cpf) {
        selectedUser.cpf = cpf;
      }
      if (email) {
        selectedUser.email = email;
      }
      if (age) {
        selectedUser.age = age;
      }

      return RequestSuccess.dataUpdated(res, "User");
    } catch (err) {
      return ServerError.genericError(res, err);
    }
  }

  // Delete an user
  public delete(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const db = new UserDatabase();
      const userIndex = db.getIndex(userId);

      if (userIndex < 0) {
        return RequestError.dataNotFound(res, "User");
      }

      db.delete(userIndex);

      return RequestSuccess.dataDeleted(res, "User");
    } catch (err) {
      return ServerError.genericError(res, err);
    }
  }
}
