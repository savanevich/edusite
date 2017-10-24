import { Repository } from 'typeorm';

import DbConnector from '../utils/db/DbConnector';
import BaseRepository from './BaseRepository';
import Category from '../entities/Category';
import EntityNotFoundError from "../errors/EntityNotFoundError";

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

        //noinspection TypeScriptUnresolvedFunction
        return repository.save(category);
    }

    public async remove(category: Category): Promise<Category> {
        const repository = await this.getRepository();

        return repository.remove(category);
    }

    public async findOneById(id: number): Promise<Category | undefined > {
        const repository = await this.getRepository();
        const category = await repository
            .createQueryBuilder('category')
            .select(['category.id', 'category.name'])
            .where('category.id = :id', { id })
            .getOne();

        if (!category) {
            throw new EntityNotFoundError('Category with this id doesn\'t exist.');
        }

        return category;
    }

    public async findOneByName(name: string): Promise<Category | undefined > {
        const repository = await this.getRepository();

        return repository
            .createQueryBuilder('category')
            .select(['category.id', 'category.name'])
            .where('category.name = :name', { name })
            .getOne();
    }

    public async findAll(): Promise<Category[] | undefined > {
        const repository = await this.getRepository();

        return repository
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
