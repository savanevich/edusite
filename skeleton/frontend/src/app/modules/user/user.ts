export class User {
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public password: string,
    public active: number,
    public birthday: string,
    public createdAt: string,
    public followingUsers: Array<any>,
    public userFollowers: Array<any>,
  ) {
  }
}
