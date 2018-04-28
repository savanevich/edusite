import { CONFIG } from '../../config/config';

export const FETCH_USERS_URL = `${CONFIG.API_URL}/users`;
export const FETCH_USER_ARTICLES = `${CONFIG.API_URL}/users/:userID/articles `;
export const FETCH_USER_SKILLS = `${CONFIG.API_URL}/users/:userID/skills`;
export const ADD_USER_SKILL = `${CONFIG.API_URL}/users/:userID/skills`;
export const EDIT_USER_SKILL = `${CONFIG.API_URL}/users/:userID/skills/:skillID`;
export const DELETE_USER_SKILL = `${CONFIG.API_URL}/users/:userID/skills/:skillID`;
