import { Repository } from 'typeorm';

import DbConnector from '../utils/db/DbConnector';
import BaseRepository from './BaseRepository';
import Category from '../entities/Category';

class CategoryRepository extends BaseRepository {
    private static instance: CategoryRepository;

    public static getInstance(): CategoryRepository {
        if (!CategoryRepository.instance) {
            CategoryRepository.instance = new CategoryRepository();
        }

        return CategoryRepository.instance;
    }

    public async save(category: Category): Promise<Category> {
        const repository = await this.getRepository();

        return repository.persist(category);
    }

    public async findOneById(id: number): Promise<Category | undefined> {
        const repository = await this.getRepository();

        return repository.findOneById(id);
    }

    public async find(): Promise<Category[]> {
        const repository = await this.getRepository();

        return repository.find();
    }

    public async remove(category: Category): Promise<Category> {
        const repository = await this.getRepository();

        return repository.remove(category);
    }

    private async getRepository(): Promise<Repository<Category>> {
        const connection = await DbConnector.getConnection();

        return connection.getRepository(Category);
    }
}

export default CategoryRepository.getInstance();
