import { Offer } from './offer';
import {User} from "./user";


export class TutoringFactory {
  static empty(): Offer {
    return new Offer(0, '', '', 0,0, new User(0, '', '', 0, '', '','','',''),false,
      [{id: 0, date: new Date(), from: new Date(), to: new Date(), user_id:0, offer_id:0}], [{id:0, text: '', user_id: 0, offer_id:0, user: new User (0, '', '', 0, '', '','','','')}]);
  }
  static fromObject(rawOffer: any): Offer {
    return new Offer(
      rawOffer.id,
      rawOffer.title,
      rawOffer.description,
      rawOffer.subject_id,
      rawOffer.user_id,
      rawOffer.user,
      rawOffer.booked,
      rawOffer.appointments,
      rawOffer.messages
    );
  }
}
