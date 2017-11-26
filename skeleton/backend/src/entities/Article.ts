import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';

import Category from './Category';
import User from './User';
import Comment from './Comment';
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
        type: 'text'
    })
    public preview: string;

    @Column({
        type: 'text'
    })
    public content: string;

    @Column({
        type: 'varchar',
        nullable: true
    })
    public coverUrl: string;

    @Column({
        type: 'int',
        default: 0
    })
    public viewsCounter: number;

    @Column({
        type: 'smallint',
        length: 1
    })
    public deleted: boolean = false;

    @CreateDateColumn()
    public createdAt: Date;

    @UpdateDateColumn()
    public updatedAt: Date;

    @ManyToOne(type => User, user => user.articles)
    public user: User;

    @ManyToOne(type => Category, category => category.articles)
    public category: Category;

    @OneToMany(type => Comment, comment => comment.article)
    public comments: Comment[];

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
