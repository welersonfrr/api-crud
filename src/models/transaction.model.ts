import { v4 as createUuid } from "uuid";

export class Transaction {
  private _id: string;

  constructor(
    private _title: string,
    private _value: number,
    private _type: string
  ) {
    this._id = createUuid();
  }

  //   getter _id
  public get id(): string {
    return this._id;
  }

  //   getter e setter _title
  public get title(): string {
    return this._title;
  }

  public set title(v: string) {
    this._title = v;
  }
  //   getter e setter _value
  public get value(): number {
    return this._value;
  }

  public set value(v: number) {
    this._value = v;
  }
  //   getter e setter _type
  public get type(): string {
    return this._type;
  }

  public set type(v: string) {
    this._type = v;
  }

  /**
   * toJson
   */
  public toJson() {
    return {
      id: this._id,
      title: this._title,
      value: this._value,
      type: this._type,
    };
  }
}
