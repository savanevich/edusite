import DbConnector from '../utils/db/DbConnector';
import User from '../entities/User';
import BaseRepository from './BaseRepository';
import {Repository} from "typeorm";

class UserRepository extends BaseRepository {
    private static instance: UserRepository;

    public static readonly SELECT_ROWS = [
        'user.id',
        'user.email',
        'user.name',
        'user.birthday',
        'user.active',
        'user.createdAt'
    ];

    private async getRepository(): Promise<Repository<User>> {
        const connection = await DbConnector.getConnection();

        return connection.getRepository(User);
    }

    public static getInstance(): UserRepository {
        if (!UserRepository.instance) {
            UserRepository.instance = new UserRepository();
        }

        return UserRepository.instance;
    }

    public async save(user: User): Promise<User> {
        const repository = await this.getRepository();

        //noinspection TypeScriptUnresolvedFunction
        return repository.save(user);
    }

    public async findOneById(id: number): Promise<User|undefined> {
        const repository = await this.getRepository();

        return repository
            .createQueryBuilder('user')
            .select(UserRepository.SELECT_ROWS)
            .leftJoinAndSelect('user.userFollowers', 'followers')
            .leftJoinAndSelect('user.followingUsers', 'following')
            .where('user.id = :id', { id })
            .getOne();
    }

    public async findOneByEmail(email: string): Promise<User|undefined> {
        const repository = await this.getRepository();

        return repository
            .createQueryBuilder('user')
            .select(['user.id', 'user.email', 'user.name', 'user.birthday', 'user.active', 'user.password', 'user.createdAt'])
            .leftJoinAndSelect('user.userFollowers', 'followers')
            .leftJoinAndSelect('user.followingUsers', 'following')
            .where('user.email = :email', { email })
            .getOne();
    }

    public async findOneByEmailOrName(email: string, name: string): Promise<User|undefined> {
        const repository = await this.getRepository();

        return repository
            .createQueryBuilder('user')
            .select(['user.id', 'user.email', 'user.name', 'user.birthday', 'user.active'])
            .where('user.email = :email', { email })
            .orWhere('user.name = :name', { name })
            .getOne();
    }

    public async findAll(): Promise<any> {
        const repository = await this.getRepository();

        return repository
            .createQueryBuilder('user')
            .select(UserRepository.SELECT_ROWS)
            .leftJoinAndSelect('user.userFollowers', 'followers')
            .leftJoinAndSelect('user.followingUsers', 'following')
            .getMany();
    }
}

export default UserRepository.getInstance();
