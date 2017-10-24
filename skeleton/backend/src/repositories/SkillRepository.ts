import { Repository } from 'typeorm';

import DbConnector from '../utils/db/DbConnector';
import BaseRepository from './BaseRepository';
import Skill from '../entities/Skill';
import User from '../entities/User';

class SkillRepository extends BaseRepository {
    private static instance: SkillRepository;

    private async getRepository(): Promise<Repository<Skill>> {
        const connection = await DbConnector.getConnection();

        return connection.getRepository(Skill);
    }

    public static getInstance(): SkillRepository {
        if (!SkillRepository.instance) {
            SkillRepository.instance = new SkillRepository();
        }

        return SkillRepository.instance;
    }

    public async save(skill: Skill): Promise<Skill> {
        const repository = await this.getRepository();

        //noinspection TypeScriptUnresolvedFunction
        return repository.save(skill);
    }

    public async remove(skill: Skill): Promise<Skill> {
        const repository = await this.getRepository();

        return repository.remove(skill);
    }

    public async findSkillsByUserID(userID: number): Promise<Skill[] | undefined> {
        const repository = await this.getRepository();

        return repository
            .createQueryBuilder('skill')
            .select(['skill.id', 'skill.level', 'skill.description', 'skill.abilityId', 'skill.userId'])
            .where('skill.userId = :userID',
                { userID })
            .getMany();
    }

    public async findOneByID(skillID: number, userID: number): Promise<Skill | undefined> {
        const repository = await this.getRepository();

        return repository
            .createQueryBuilder('skill')
            .select(['skill.id', 'skill.level', 'skill.description', 'skill.abilityId', 'skill.userId'])
            .where('skill.userId = :userID AND skill.id = :skillID',
                { userID, skillID })
            .getOne();
    }
}

export default SkillRepository.getInstance();
