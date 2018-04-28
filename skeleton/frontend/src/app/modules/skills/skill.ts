import { User } from '../user/user';
import { Category } from '../categories/category';
import { Ability } from '../abilities/ability';

export class Skill {
  constructor(
    public id: number,
    public userId: number,
    public categoryID: number,
    public level: string,
    public description?: string,
    public user?: User,
    public category?: Category,
    public ability?: Ability,
    public abilityName?: string
  ) {
  }
}
