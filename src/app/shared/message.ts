import {User} from "./user";

export class Message {
  constructor(
    public id: number,
    public text: string,
    public offer_id: number,
    public user_id: number,
    public user: User
  ) {
  }
}
