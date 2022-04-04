export class ChatModel {
  constructor(
    public chatName: string,
    public createdAt: string,
    public isGroupChat: boolean,
    public updatedAt: string,
    public users: [],
    public _id: string
  ) {}
}
