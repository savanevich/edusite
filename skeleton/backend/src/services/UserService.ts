import * as crypto from 'crypto';

import User from '../entities/User';
import UserRepository from '../repositories/UserRepository';
import { CreateUserRequest, UpdateUserRequest } from '../interfaces/UserRequests';
import DbConnector from '../utils/db/DbConnector';
import JobManager from '../jobs/JobManager';
import { USER_REGISTERED } from '../constants/JobTypes';
import { EMAIL_QUEUE_NAME } from '../jobs/queues/EmailQueue';

class UserService {

    private static instance: UserService;

    public static getInstance(): UserService {
        if (!UserService.instance) {
            UserService.instance = new UserService();
        }

        return UserService.instance;
    }

    public async getUser(user: User): Promise<any> {
        return UserRepository.findOneById(user.id);
    }

    public async getUserByID(userID: number): Promise<any> {
        return UserRepository.findOneById(userID);
    }

    public async getUsers(): Promise<any> {
        return UserRepository.findAll();
    }

    public async loginUser(user: User): Promise<string> {
        const token = crypto.randomBytes(64).toString('hex');
        const client = DbConnector.getRedisConnection();

        await client.set(token, JSON.stringify(user));

        return token;
    }

    public async createUser(data: CreateUserRequest): Promise<User> {
        const user: User = await User.create(data);

        return UserRepository.save(user).then((resultUser: User) => {
            JobManager.addJob(EMAIL_QUEUE_NAME, {
                data: {
                    email: resultUser.email
                },
                type: USER_REGISTERED
            }).catch(err => console.error(err));

            return resultUser;
        });
    }

    public async updateUser(currentUser: User, data: UpdateUserRequest): Promise<User> {

        if (data.name) {
            currentUser.name = data.name;
        }
        if (data.email) {
            currentUser.email = data.email;
        }
        if (data.birthday) {
            currentUser.birthday = new Date(Date.parse(data.birthday));
        }

        await UserRepository.save(currentUser);

        return currentUser;
    }

    public async setUserInactive(currentUser: User): Promise<User> {
        currentUser.active = false;
        await UserRepository.save(currentUser);

        return currentUser;
    }
}

export default UserService.getInstance();