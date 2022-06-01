import {Offer} from "./offer";

export class Subject {
  constructor(public id: number, public title: string, public description: string, public offers?: Offer[]) {
  }
}
