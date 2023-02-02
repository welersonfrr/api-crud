import { v4 as createUuid } from "uuid";
import { Transaction } from "./transaction.model";

export class User {
  private _id: string;

  constructor(
    private _name: string,
    private _cpf: string,
    private _email: string,
    private _age: number,
    private _transactions?: Transaction[]
  ) {
    this._id = createUuid();
  }

  //   getter _id
  public get id(): string {
    return this._id;
  }

  //   getter e setter _name
  public get name(): string {
    return this._name;
  }

  public set name(v: string) {
    this._name = v;
  }
  //   getter e setter _cpf
  public get cpf(): string {
    return this._cpf;
  }

  public set cpf(v: string) {
    this._cpf = v;
  }
  //   getter e setter _email
  public get email(): string {
    return this._email;
  }

  public set email(v: string) {
    this._email = v;
  }
  //   getter e setter _age
  public get age(): number {
    return this._age;
  }

  public set age(v: number) {
    this._age = v;
  }
  //   getter e setter _transactions
  public get transactions(): Transaction[] {
    return this._transactions ?? [];
  }

  public set transactions(v: Transaction[]) {
    this._transactions = v;
  }

  /**
   * toJson
   * Rename the params to remove '_'
   */
  public toJson() {
    return {
      id: this._id,
      cpf: this._cpf,
      email: this._email,
      age: this._age,
      transactions: this._transactions,
    };
  }

  /**
   * simpleUserToJson
   */
  public simpleUserToJson() {
    return {
      id: this._id,
      name: this._name,
      cpf: this._cpf,
      email: this._email,
      age: this._age,
    };
  }
  /**
   * simpleUserToJson
   */
  public transactionsList() {
    return {
      transactions: this._transactions,
      balance: {},
    };
  }
}
