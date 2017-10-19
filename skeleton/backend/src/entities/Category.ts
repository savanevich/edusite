import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';

import Technology from './Technology';
import { CreateCategoryRequest } from '../interfaces/CreateCategoryRequest';

@Entity('categories')
export default class Category {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column({
        type: 'varchar',
        length: 100
    })
    public name: string;

    @ManyToMany(type => Technology, technology => technology.categories)
    public technologies: Technology[];

    public static create(data: CreateCategoryRequest): Category {
        const category = new Category();
        category.name = data.name;

        return category;
    }
}
