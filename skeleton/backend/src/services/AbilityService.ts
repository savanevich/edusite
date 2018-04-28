import AbilityRepository from '../repositories/AbilityRepository';
import CategoryRepository from '../repositories/CategoryRepository';
import Ability from "../entities/Ability";
import { CreateAbilityRequest, UpdateAbilityRequest } from '../interfaces/AbilityRequests';
import Category from "../entities/Category";
import EntityNotFoundError from '../errors/EntityNotFoundError';

class AbilityService {

    private static instance: AbilityService;

    public static getInstance(): AbilityService {
        if (!AbilityService.instance) {
            AbilityService.instance = new AbilityService();
        }

        return AbilityService.instance;
    }

    public async getAbilityByID(abilityID: number): Promise<Ability|undefined> {
        return AbilityRepository.findOneById(abilityID);
    }

    public async getAbilities(): Promise<Ability[] | undefined> {
        return AbilityRepository.findAll();
    }

    public async getAbilitiesByCategory(category: Category): Promise<Ability[] | undefined> {
        return AbilityRepository.findByCategory(category);
    }

    public async searchByName(name: string): Promise<Ability[] | undefined> {
        return AbilityRepository.searchByName(name);
    }

    public async getOrCreateAbility(abilityName: string, categoryID: number): Promise<Ability> {
        const category = await CategoryRepository.findOneById(categoryID);

        if (!category) {
            throw new EntityNotFoundError('Category with this id doesn\'t exist.');
        }

        let ability = await AbilityRepository.findOneByName(abilityName);

        if (!ability) {
            const abilityData = {
                name: abilityName,
                categoryID
            };
            ability = await this.createAbility(abilityData, category)
        }

        return ability;
    }

    public async createAbility(data: CreateAbilityRequest, category: Category): Promise<Ability> {
        const ability: Ability = await Ability.create(data, category);

        return AbilityRepository.save(ability);
    }

    public async updateAbility(currentAbility: Ability, category: Category, data: UpdateAbilityRequest): Promise<Ability> {
        if (data.name) {
            currentAbility.name = data.name;
        }
        currentAbility.category = category;

        await AbilityRepository.save(currentAbility);

        return currentAbility;
    }

    public async removeAbility(ability: Ability) {

        return AbilityRepository.remove(ability);
    }

}

export default AbilityService.getInstance();