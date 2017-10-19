import DbConnector from '../utils/db/DbConnector';

import BaseRepository from './BaseRepository';
import UserFollower from '../entities/UserFollower';
import User from '../entities/User';

class UserFollowerRepository extends BaseRepository {
    private static instance: UserFollowerRepository;

    public static getInstance(): UserFollowerRepository {
        if (!UserFollowerRepository.instance) {
            UserFollowerRepository.instance = new UserFollowerRepository();
        }

        return UserFollowerRepository.instance;
    }
}

export default UserFollowerRepository.getInstance();
