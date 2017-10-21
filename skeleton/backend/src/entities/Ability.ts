import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, ManyToOne } from 'typeorm';

import User from './User';
import Category from './Category';
import { CreateAbilityRequest } from '../interfaces/AbilityRequests';

@Entity('abilities')
export default class Ability {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column({
        type: 'varchar',
        length: 100
    })
    public name: string;

    @ManyToMany(type => User, user => user.abilities)
    @JoinTable({
        name: 'users_abilities'
    })
    public users: User[];

    @ManyToOne(type => Category, category => category.abilities)
    public category: Category;

    public static create(data: CreateAbilityRequest, category: Category): Ability {
        const ability = new Ability();

        console.log(data);
        console.log(category);

        ability.name = data.name;
        ability.category = category;

        return ability;
    }
}
