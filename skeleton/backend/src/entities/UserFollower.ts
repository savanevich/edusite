import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import User from './User';

@Entity('users_followers')
export default class UserFollower {

    @PrimaryGeneratedColumn()
    public id: number;

    @ManyToOne(type => User, user => user.followingUsers)
    public user: User;

    @ManyToOne(type => User, user => user.userFollowers)
    public follower: User;

    public static create(followingUser: User, follower: User): UserFollower {
        const userFollower = new UserFollower();
        userFollower.user = followingUser;
        userFollower.follower = follower;

        return userFollower;
    }
}
