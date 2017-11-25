import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, ManyToOne, OneToMany } from 'typeorm';

import Category from './Category';
import Skill from './Skill';
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

    @ManyToOne(type => Category, category => category.abilities)
    public category: Category;

    @OneToMany(type => Skill, skill => skill.ability)
    public skills: Skill[];

    public static create(data: CreateAbilityRequest, category: Category): Ability {
        const ability = new Ability();

        ability.name = data.name;
        ability.category = category;

        return ability;
    }
}
