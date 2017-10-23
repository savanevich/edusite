import FollowerRepository from '../repositories/FollowerRepository';
import Follower from '../entities/Follower';
import User from '../entities/User';

class FollowerService {
    private static instance: FollowerService;

    public static getInstance(): FollowerService {
        if (!FollowerService.instance) {
            FollowerService.instance = new FollowerService();
        }

        return FollowerService.instance;
    }

    public async followUser(follower: User, following: User): Promise<Follower> {
        const followerRelation: Follower = await Follower.create(follower, following);

        return FollowerRepository.save(followerRelation);
    }

    public async unFollowUser(followerRelation: Follower): Promise<Follower> {
        return FollowerRepository.remove(followerRelation);
    }

    public async getUserFollowers(user: User): Promise<Follower[] | undefined> {
        return FollowerRepository.getFollowersByUser(user.id);
    }

    public async getUserFollowing(user: User): Promise<Follower[] | undefined> {
        return FollowerRepository.getFollowingByUser(user.id);
    }
}

export default FollowerService.getInstance();