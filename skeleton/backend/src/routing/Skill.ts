import { Router } from 'express';

import SkillController from '../controllers/SkillController';

import { skillCreateValidation, skillUpdateValidation, fetchSkillFromParam } from '../middlewares/SkillMiddleware';
import { checkUserAuthentication, fetchUserFromParam, onlyAdminOrAuthenticatedUser } from '../middlewares/UserMiddleware';

export default (router: Router) => {
    router.get('/users/:userID/skills', fetchUserFromParam, SkillController.getUserSkills);
    router.post('/users/:userID/skills', checkUserAuthentication, fetchUserFromParam, onlyAdminOrAuthenticatedUser, skillCreateValidation, SkillController.createUserSkill);
    router.put('/users/:userID/skills/:skillID', checkUserAuthentication, fetchUserFromParam, onlyAdminOrAuthenticatedUser, fetchSkillFromParam, skillUpdateValidation, SkillController.updateUserSkill);
    router.delete('/users/:userID/skills/:skillID', checkUserAuthentication, fetchUserFromParam, onlyAdminOrAuthenticatedUser, fetchSkillFromParam, SkillController.deleteUserSkill);
}