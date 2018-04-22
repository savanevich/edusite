import { CONFIG } from '../../config/config';

export const CREATE_ARTICLE_URL = `${CONFIG.API_URL}/articles`;
export const UPDATE_ARTICLE_URL = `${CONFIG.API_URL}/articles/:id`;
export const DELETE_ARTICLE_URL = `${CONFIG.API_URL}/articles/:id`;
export const FETCH_ARTICLE = `${CONFIG.API_URL}/articles/:id`;
export const GET_USER_WALL = `${CONFIG.API_URL}/articles`;
