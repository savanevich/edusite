import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

import Article from './Article';
import User from './User';
import { CommentRequest } from '../interfaces/CommentRequests';

@Entity('comments')
export default class Comment {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column({
        type: 'varchar',
        length: 255
    })
    public body: string;

    @Column({
        type: 'smallint',
        length: 1
    })
    public deleted: boolean = false;

    @Column({
        type: 'int',
    })
    public userId: number;

    @Column({
        type: 'int',
    })
    public articleId: number;

    @CreateDateColumn()
    public createdAt: Date;

    @UpdateDateColumn()
    public updatedAt: Date;

    @ManyToOne(type => User, user => user.comments)
    public user: User;

    @ManyToOne(type => Article, article => article.comments)
    public article: Article;

    public static create(data: CommentRequest, user: User, article: Article): Comment {
        const message = new Comment();

        message.body = data.body;
        message.article = article;
        message.user = user;
        message.deleted = false;

        return message;
    }
}
