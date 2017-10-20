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
        const connection = await DbConnector.getConnection();

        //noinspection TypeScriptUnresolvedFunction
        return connection.getRepository(Category).save(category);
    }

    public async remove(category: Category): Promise<Category> {
        const connection = await DbConnector.getConnection();

        return connection.getRepository(Category).remove(category);
    }

    public async findOneById(id: number): Promise<Category | undefined > {
        const connection = await DbConnector.getConnection();

        return connection.getRepository(Category)
            .createQueryBuilder('category')
            .select(['category.id', 'category.name'])
            .where('category.id = :id', { id })
            .getOne();
    }

    public async findOneByName(name: string): Promise<Category | undefined > {
        const connection = await DbConnector.getConnection();

        return connection.getRepository(Category)
            .createQueryBuilder('category')
            .select(['category.id', 'category.name'])
            .where('category.name = :name', { name })
            .getOne();
    }

    public async findAll(): Promise<Category[] | undefined > {
        const connection = await DbConnector.getConnection();

        return connection.getRepository(Category)
            .createQueryBuilder('category')
            .select(['category.id', 'category.name'])
            .getMany();
    }

    private async getRepository(): Promise<Repository<Category>> {
        const connection = await DbConnector.getConnection();

        return connection.getRepository(Category);
    }
}

export default CategoryRepository.getInstance();
