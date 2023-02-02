import { Transaction } from "../models/transaction.model";
import { User } from "../models/user.model";

export const users: User[] = [
  new User("Welerson", "00000000001", "welerson@teste.com", 26, [
    new Transaction("Deposito", 100, "income"),
    new Transaction("Saque", 50, "outcome"),
  ]),
  new User("Usuario 2", "00000000002", "usuario2@teste.com", 20, [
    new Transaction("Deposito", 80, "income"),
    new Transaction("Saque", 30, "outcome"),
  ]),
  new User("Usuario 3", "00000000003", "usuario3@teste.com", 23, [
    new Transaction("Deposito", 50, "income"),
    new Transaction("Saque", 10, "outcome"),
  ]),
];
