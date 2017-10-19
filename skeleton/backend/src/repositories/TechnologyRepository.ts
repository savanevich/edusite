import { Repository } from 'typeorm';
import DbConnector from '../utils/db/DbConnector';
import Technology from '../entities/Technology';
import BaseRepository from './BaseRepository';

class TechnologyRepository extends BaseRepository {
    private static instance: TechnologyRepository;

    public static getInstance(): TechnologyRepository {
        if (!TechnologyRepository.instance) {
            TechnologyRepository.instance = new TechnologyRepository();
        }

        return TechnologyRepository.instance;
    }

    public async save(technology: Technology): Promise<Technology> {
        const repository = await this.getRepository();

        return repository.persist(technology);
    }

    public async findOneById(id: number): Promise<Technology | undefined> {
        const repository = await this.getRepository();

        return repository.findOneById(id);
    }

    public async find(): Promise<Technology[]> {
        const repository = await this.getRepository();

        return repository.find();
    }

    public async remove(technology: Technology): Promise<Technology> {
        const repository = await this.getRepository();

        return repository.remove(technology);
    }

    private async getRepository(): Promise<Repository<Technology>> {
        const connection = await DbConnector.getConnection();

        return connection.getRepository(Technology);
    }
}

export default TechnologyRepository.getInstance();
