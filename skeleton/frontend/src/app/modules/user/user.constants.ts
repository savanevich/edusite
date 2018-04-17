import { CONFIG } from '../../config/config';

export const FETCH_USERS_URL = `${CONFIG.API_URL}/users`;
export const FETCH_USER_ARTICLES = `${CONFIG.API_URL}/users/:userID/articles `;
