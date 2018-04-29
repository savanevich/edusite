import { User } from '../user/user';
import { Category } from '../categories/category';
import { Ability } from '../abilities/ability';

export class Article {
  constructor(
    public title: string,
    public preview: string,
    public content: string,
    public categoryID: number,
    public id?: number,
    public coverUrl?: number,
    public user?: User,
    public category?: Category,
    public abilities?: Ability[],
    public comments?: any[]
  ) {
  }
}
