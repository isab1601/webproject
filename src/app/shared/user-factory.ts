import {User} from "./user";

export class UserFactory {

  static empty(): User {
    return new User(0, '', '', 0, '', '', '', '', '');
  }

  static fromObject(rawUser: any): User {
    return new User(
      rawUser.id,
      rawUser.firstName,
      rawUser.lastName,
      rawUser.role,
      rawUser.url,
      rawUser.information,
      rawUser.phonenumber,
      rawUser.email,
      rawUser.password,
    );
  }

}
