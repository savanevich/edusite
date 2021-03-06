import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import Ability from './Ability';
import Article from './Article';
import { CreateCategoryRequest } from '../interfaces/CategoryRequests';

@Entity('categories')
export default class Category {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column({
        type: 'varchar',
        length: 100,
        unique: true
    })
    public name: string;

    @OneToMany(type => Ability, ability => ability.category)
    public abilities: Ability[];

    @OneToMany(type => Article, article => article.category)
    public articles: Article[];

    public static create(data: CreateCategoryRequest): Category {
        const category = new Category();
        category.name = data.name;

        return category;
    }
}
