import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';

import User from './User';
import Category from './Category';
import { CreateTechnologyRequest } from '../interfaces/CreateTechnologyRequest';

@Entity('technologies')
export default class Technology {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column({
        type: 'varchar',
        length: 100
    })
    public name: string;

    @ManyToMany(type => User, user => user.technologies)
    @JoinTable()
    public users: User[];

    @ManyToMany(type => Category, category => category.technologies)
    @JoinTable()
    public categories: Category[];

    public static create(data: CreateTechnologyRequest): Technology {
        const technology = new Technology();

        technology.name = data.name;

        return technology;
    }
}
