import {Offer} from "./offer";

export class User {
  constructor(
    public id: number,
    public firstName: string,
    public lastName: string,
    public role: number,
    public url: string,
    public information: string,
    public phonenumber: string,
    public email: string,
    public password: string,
    public offers?: Offer[]
  ) {
  }
}
