import { Transaction } from "../models/transaction.model";

export const transactions: Transaction[] = [
  new Transaction("Deposito", 100, "D"),
  new Transaction("Saque", 50, "W"),

  new User("Usuario 2", "00000000002", "usuario2@teste.com", 20, [
    new Transaction("Deposito", 80, "D"),
    new Transaction("Saque", 30, "W"),
  ]),
  new User("Usuario 3", "00000000003", "usuario3@teste.com", 23, [
    new Transaction("Deposito", 50, "D"),
    new Transaction("Saque", 10, "W"),
  ]),
];
