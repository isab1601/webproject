import {Message} from "./message";
import {User} from "./user";


export class MessageFactory {
  static empty(): Message {
    return new Message(0, '', 0, 0, new User(0, '', '', 0, '', '', '', '', ''));
  }

  static fromObject(rawMessage: any): Message {
    return new Message(
      rawMessage.id,
      rawMessage.text,
      rawMessage.offer_id,
      rawMessage.user_id,
      rawMessage.user
    );
  }
}
