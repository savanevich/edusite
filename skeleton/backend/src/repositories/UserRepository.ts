import DbConnector from '../utils/db/DbConnector';
import User from '../entities/User';
import BaseRepository from './BaseRepository';

class UserRepository extends BaseRepository {
    private static instance: UserRepository;

    public static getInstance(): UserRepository {
        if (!UserRepository.instance) {
            UserRepository.instance = new UserRepository();
        }

        return UserRepository.instance;
    }

    public async save(user: User): Promise<User> {
        const connection = await DbConnector.getConnection();

        //noinspection TypeScriptUnresolvedFunction
        return connection.getRepository(User).save(user);
    }

    public async findOneById(id: number): Promise<User|undefined> {
        const connection = await DbConnector.getConnection();

        return connection.getRepository(User)
            .createQueryBuilder('user')
            .select(['user.id', 'user.email', 'user.name', 'user.birthday', 'user.active'])
            .where('user.id = :id', { id })
            .getOne();
    }

    public async findOneByEmail(email: string): Promise<User|undefined> {
        const connection = await DbConnector.getConnection();
        console.log({email});

        return connection.getRepository(User)
            .createQueryBuilder('user')
            .where('user.email = :email', { email })
            .getOne();
    }

    public async findOneByEmailOrName(email: string, name: string): Promise<User|undefined> {
        const connection = await DbConnector.getConnection();

        return connection.getRepository(User)
            .createQueryBuilder('user')
            .select(['user.id', 'user.email', 'user.name', 'user.birthday', 'user.active'])
            .where('user.email = :email OR user.name = :name', { email })
            .orWhere('user.name = :name', { name })
            .getOne();
    }

    public async findAll(): Promise<any> {
        const connection = await DbConnector.getConnection();

        return connection.getRepository(User)
            .createQueryBuilder('user')
            .select(['user.id', 'user.email', 'user.name', 'user.birthday', 'user.active'])
            .getMany();
    }
}

export default UserRepository.getInstance();
