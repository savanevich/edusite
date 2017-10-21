import { Router } from 'express';

import AbilityController from '../controllers/AbilityController';
import { checkUserAuthentication } from '../middlewares/UserMiddleware';
import { abilityCreateValidation, abilityUpdateValidation, abilityDeleteValidation } from '../middlewares/AbilityMiddleware';
import { categoryUpdateValidation } from '../middlewares/CategoryMiddleware';

export default (router: Router) => {
    router.get('/abilities/:id', AbilityController.getAbility);
    router.get('/abilities', AbilityController.getAbilities);
    router.post('/abilities', checkUserAuthentication, abilityCreateValidation, AbilityController.addAbility);
    router.put('/abilities/:id', checkUserAuthentication, abilityUpdateValidation, AbilityController.updateAbility);
    router.delete('/abilities/:id', checkUserAuthentication, abilityDeleteValidation, AbilityController.deleteAbility);
    router.get('/abilities/category/:id', categoryUpdateValidation, AbilityController.getAbilitiesByCategory);
};
