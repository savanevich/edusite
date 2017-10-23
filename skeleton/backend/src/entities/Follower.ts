import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import User from './User';

@Entity('users_followers')
export default class Follower {

    @PrimaryGeneratedColumn()
    public id: number;

    @ManyToOne(type => User, user => user.followingUsers)
    public following: User;

    @ManyToOne(type => User, user => user.userFollowers)
    public follower: User;

    public static create(follower: User, followingUser: User): Follower {
        const userFollower = new Follower();
        userFollower.following = followingUser;
        userFollower.follower = follower;

        return userFollower;
    }
}
