import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

import User from './User';
import Ability from './Ability';
import { SkillRequest } from '../interfaces/SkillRequests';

@Entity('skills')
export default class Skill {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column({
        type: 'smallint',
        length: 1
    })
    public level: number;

    @Column({
        type: 'varchar',
        length: 100,
        nullable: true
    })
    public description?: string;

    @Column({
        type: 'int',
    })
    public userId: number;

    @Column({
        type: 'int',
    })
    public abilityId: number;

    @ManyToOne(type => User, user => user.skills)
    public user: User;

    @ManyToOne(type => Ability, ability => ability.skills)
    public ability: Ability;

    public static create(data: SkillRequest, user: User, ability: Ability): Skill {
        const skill = new Skill();

        skill.user = user;
        skill.ability = ability;
        skill.level = data.level;
        skill.description = data.description;

        return skill;
    }
}
