import { expect } from 'chai';

import Technology from '../../src/entities/Technology';
import TechnologyRepository from '../../src/repositories/TechnologyRepository';
import { CreateTechnologyRequest } from '../../src/interfaces/CreateTechnologyRequest';

describe('Technology entity', () => {
    const technologyRequest: CreateTechnologyRequest = {
        name: 'Test name'
    };

    it('should have right properties after create and save', async () => {
        const technology: Technology = Technology.create(technologyRequest);

        await TechnologyRepository.save(technology);

        expect(technology.name).to.be.eq(technologyRequest.name);
        expect(technology).to.have.property('id');
        expect(technology.id).to.be.gt(0);
    });

    it('should create method set needed properties', async () => {
        const technology: Technology = Technology.create(technologyRequest);

        expect(technology.name).to.be.eq(technologyRequest.name);
    });
});
