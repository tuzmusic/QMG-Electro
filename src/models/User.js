import uuid from "react-native-uuid";

export default class User {
  constructor(user) {
    this.id = uuid.v1();
    this.username = user.username;
    this.email = user.email;
    this.phone = user.phone;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
  }
}
