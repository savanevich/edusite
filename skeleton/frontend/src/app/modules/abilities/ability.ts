import { Category } from "../categories/category";

export class Ability {
  constructor(
    public id: number,
    public name: string,
    public categoryID: number,
    public category?: Category
  ) {
  }
}
