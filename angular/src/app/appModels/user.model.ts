export class UserModel {
  constructor(
    public email: string,
    public name: string,
    public _id: string,
    public picture: string,
    public token: string
  ) {}

  get gettoken() {
    return this.token;
  }
}
