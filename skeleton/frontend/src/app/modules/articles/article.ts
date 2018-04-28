import { User } from '../user/user';
import { Category } from "../categories/category";

export class Article {
  constructor(
    public id: number,
    public title: string,
    public preview: string,
    public content: string,
    public categoryID: number,
    public coverUrl?: number,
    public user?: User,
    public category?: Category
  ) {
  }
}
