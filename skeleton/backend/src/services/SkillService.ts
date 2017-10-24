import SkillRepository from '../repositories/SkillRepository';
import Skill from '../entities/Skill';
import { SkillRequest } from "../interfaces/SkillRequests";
import User from '../entities/User';
import Ability from '../entities/Ability';
import EntityNotFoundError from "../errors/EntityNotFoundError";

class SkillService {

    private static instance: SkillService;

    public static getInstance(): SkillService {
        if (!SkillService.instance) {
            SkillService.instance = new SkillService();
        }

        return SkillService.instance;
    }

    public async findOneByID(skillID: number, userID: number): Promise<Skill | undefined> {
        const skill = await SkillRepository.findOneByID(skillID, userID);

        if (!skill) {
            throw new EntityNotFoundError('Skill with this id wasn\'t found for this user.');
        }

        return skill;
    }

    public async getUserSkills(user: User): Promise<Skill[] | undefined> {
        return SkillRepository.findSkillsByUserID(user.id);
    }

    public async createUserSkill(data: SkillRequest, user: User, ability: Ability): Promise<Skill> {
        const message: Skill = await Skill.create(data, user, ability);

        return SkillRepository.save(message);
    }

    public async removeUserSkill(skill: Skill): Promise<Skill> {
        return SkillRepository.remove(skill);
    }

    public async updateUserSkill(data: SkillRequest, skill: Skill, ability: Ability): Promise<Skill> {
        if (data.description) {
            skill.description = data.description;
        }
        if (data.level) {
            skill.level = data.level;
        }
        skill.ability = ability;

        await SkillRepository.save(skill);

        return skill;
    }
}

export default SkillService.getInstance();