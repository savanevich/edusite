import { User } from '../user/user';

export class Comment {
  constructor(
    public body: string,
    public id?: number,
    public user?: User,
  ) {
  }
}
