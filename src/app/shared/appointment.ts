import {Offer} from "./offer";

export class Appointment {
  constructor(
    public id: number,
    public date: Date,
    public from: Date,
    public to: Date,
    public user_id: number,
    public offer_id: number,
    public offer: any
  ) {
  }
}
