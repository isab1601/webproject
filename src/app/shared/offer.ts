import {Subject} from "./subject";
export {Subject} from "./subject";
import {Appointment} from "./appointment";
import {User} from "./user";
import {Message} from "./message";

export {Appointment} from "./appointment";


export class Offer {
  constructor(
    public id: number,
    public title: string,
    public description: string,
    public subject_id: number,
    public user_id: number,
    public user: User,
    public booked: boolean,
    public appointments?: any,
    public messages?: Message[]
  ) {
  }
}
