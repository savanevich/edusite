import { Repository } from 'typeorm';
import DbConnector from '../utils/db/DbConnector';
import Ability from '../entities/Ability';
import BaseRepository from './BaseRepository';
import Category from "../entities/Category";
import EntityNotFoundError from "../errors/EntityNotFoundError";

class AbilityRepository extends BaseRepository {
    private static instance: AbilityRepository;

    private async getRepository(): Promise<Repository<Ability>> {
        const connection = await DbConnector.getConnection();

        return connection.getRepository(Ability);
    }

    public static getInstance(): AbilityRepository {
        if (!AbilityRepository.instance) {
            AbilityRepository.instance = new AbilityRepository();
        }

        return AbilityRepository.instance;
    }

    public async save(ability: Ability): Promise<Ability> {
        const repository = await this.getRepository();

        //noinspection TypeScriptUnresolvedFunction
        return repository.save(ability);
    }

    public async findOneById(id: number): Promise<Ability | undefined> {
        const repository = await this.getRepository();
        const ability = await repository
            .createQueryBuilder('ability')
            .select(['ability.id', 'ability.name'])
            .leftJoinAndSelect('ability.category', 'category')
            .where('ability.id = :id', { id })
            .getOne();

        if (!ability) {
            throw new EntityNotFoundError('Ability with this id doesn\'t exist.');
        }

        return ability;
    }

    public async findOneByName(name: string): Promise<Ability | undefined> {
        const repository = await this.getRepository();

        return repository
            .createQueryBuilder('ability')
            .select(['ability.id', 'ability.name'])
            .leftJoinAndSelect('ability.category', 'category')
            .where('ability.name = :name', { name })
            .getOne();
    }

    public async findAll(): Promise<Ability[]> {
        const repository = await this.getRepository();

        return repository
            .createQueryBuilder('ability')
            .select(['ability.id', 'ability.name'])
            .leftJoinAndSelect('ability.category', 'category')
            .getMany();
    }

    public async findByCategory(category: Category): Promise<Ability[] | undefined> {
        const repository = await this.getRepository();

        return repository
            .createQueryBuilder('ability')
            .select(['ability.id', 'ability.name'])
            .innerJoinAndSelect('ability.category', 'category')
            .where('ability.category = :categoryID', { categoryID: category.id })
            .getMany();
    }

    public async searchByName(name: string): Promise<Ability[]>  {
        const repository = await this.getRepository();

        return repository
            .createQueryBuilder('ability')
            .select(['ability.id', 'ability.name'])
            .where('ability.name LIKE :name', { name: `%${name}%` })
            .getMany();
    }

    public async remove(ability: Ability): Promise<Ability> {
        const repository = await this.getRepository();

        return repository.remove(ability);
    }
}

export default AbilityRepository.getInstance();
