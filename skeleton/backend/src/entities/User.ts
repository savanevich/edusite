import * as bcrypt from 'bcrypt';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    ManyToMany,
    CreateDateColumn,
    UpdateDateColumn
} from 'typeorm';

import { config } from '../configs/global';
import { CreateUserRequest } from '../interfaces/UserRequests';
import Ability from './Ability';
import Message from './Message';
import Follower from './Follower';

@Entity('users')
export default class User {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column({
        type: 'varchar',
        unique: true
    })
    public email: string;

    @Column({
        type: 'varchar'
    })
    public password: string;

    @Column({
        type: 'varchar',
        length: 100,
        unique: true
    })
    public name: string;

    @Column({
        type: 'date',
        nullable: true,
    })
    public birthday?: Date;

    @Column({
        type: 'smallint',
        length: 1
    })
    public active: boolean = true;

    @CreateDateColumn()
    public createdAt: Date;

    @UpdateDateColumn()
    public updatedAt: Date;

    @ManyToMany(type => Ability, ability => ability.users)
    public abilities: Ability[];

    @OneToMany(type => Message, message => message.sender)
    public sentMessages: Message[];

    @OneToMany(type => Message, message => message.recipient)
    public receivedMessages: Message[];

    @OneToMany(type => Follower, userFollower => userFollower.following)
    public userFollowers: Follower[];

    @OneToMany(type => Follower, userFollower => userFollower.follower)
    public followingUsers: Follower[];

    public static async create(data: CreateUserRequest): Promise<User> {
        const user: User = new User();

        user.name = data.name;
        user.email = data.email;
        user.birthday = data.birthday ? new Date(Date.parse(data.birthday)) : undefined;
        user.password = await bcrypt.hash(data.password, config.saltRounds);

        return user;
    }
}
