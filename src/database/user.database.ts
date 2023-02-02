import { User } from "../models/user.model";
import { Transaction } from "../models/transaction.model";
import { users } from "./users";

export class UserDatabase {
  public list() {
    return [...users];
  }

  public get(id: string) {
    return users.find((user) => user.id === id);
  }

  public getByCpf(cpf: string) {
    return users.find((user) => user.cpf === cpf);
  }

  public getIndex(id: string) {
    return users.findIndex((user) => user.id === id);
  }

  public create(user: User) {
    users.push(user);
  }

  public delete(index: number) {
    users.splice(index, 1);
  }
}
