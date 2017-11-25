import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';

import Category from './Category';
import User from './User';
import { CreateArticleRequest } from '../interfaces/ArticleRequests';

@Entity('articles')
export default class Article {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column({
        type: 'varchar',
        length: 100
    })
    public title: string;

    @Column({
        type: 'varchar',
        length: 300
    })
    public preview: string;

    @Column({
        type: 'text'
    })
    public content: string;

    @Column({
        type: 'varchar'
    })
    public coverUrl: string;

    @Column({
        type: 'int'
    })
    public viewsCounter: number;

    @CreateDateColumn()
    public createdAt: Date;

    @UpdateDateColumn()
    public updatedAt: Date;

    @ManyToOne(type => User, user => user.articles)
    public user: User;

    @ManyToOne(type => Category, category => category.articles)
    public category: Category;

    public static create(data: CreateArticleRequest, user: User, category: Category): Article {
        const article = new Article();

        article.title = data.title;
        article.preview = data.preview;
        article.content = data.content;
        article.coverUrl = data.coverUrl;
        article.user = user;
        article.category = category;

        return article;
    }
}
