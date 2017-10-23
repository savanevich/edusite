import { Repository } from 'typeorm';

import DbConnector from '../utils/db/DbConnector';
import BaseRepository from './BaseRepository';
import Follower from '../entities/Follower';

class FollowerRepository extends BaseRepository {
    private static instance: FollowerRepository;

    private async getRepository(): Promise<Repository<Follower>> {
        const connection = await DbConnector.getConnection();

        return connection.getRepository(Follower);
    }

    public static getInstance(): FollowerRepository {
        if (!FollowerRepository.instance) {
            FollowerRepository.instance = new FollowerRepository();
        }

        return FollowerRepository.instance;
    }

    public async save(followerRelation: Follower): Promise<Follower> {
        const repository = await this.getRepository();

        //noinspection TypeScriptUnresolvedFunction
        return repository.save(followerRelation);
    }

    public async remove(followerRelation: Follower): Promise<Follower> {
        const repository = await this.getRepository();

        return repository.remove(followerRelation);
    }

    public async getOneByIDs(followerID: number, followingID: number): Promise<Follower | undefined> {
        const repository = await this.getRepository();

        return repository
            .createQueryBuilder('follower')
            .select(['follower.id'])
            .where('follower.followerId = :followerID AND follower.followingId = :followingID', { followerID, followingID })
            .getOne();
    }

    public async getFollowersByUser(followerID: number): Promise<Follower[] | undefined> {
        const repository = await this.getRepository();

        return repository
            .createQueryBuilder('follower')
            .select(['follower.id'])
            .where('follower.followerId = :followerID', { followerID })
            .getMany();
    }

    public async getFollowingByUser(followingID: number): Promise<Follower[] | undefined> {
        const repository = await this.getRepository();

        return repository
            .createQueryBuilder('follower')
            .select(['follower.id'])
            .where('follower.followingId = :followingID', { followingID })
            .getMany();
    }
}

export default FollowerRepository.getInstance();
