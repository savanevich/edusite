import { CONFIG } from '../../config/config';

export const CREATE_ARTICLE_URL = `${CONFIG.API_URL}/articles`;
export const UPDATE_ARTICLE_URL = `${CONFIG.API_URL}/articles/:id`;
export const DELETE_ARTICLE_URL = `${CONFIG.API_URL}/articles/:id`;
export const POST_COMMENT_TO_ARTICLE_URL = `${CONFIG.API_URL}/articles/:id/comments`;
export const DELETE_COMMENT_URL = `${CONFIG.API_URL}/articles/:articleId/comments/:commentId`;
export const GET_ARTICLE_URL = `${CONFIG.API_URL}/articles/:id`;
export const GET_ARTICLES_URL = `${CONFIG.API_URL}/articles`;
export const GET_ABILITIES_URL = `${CONFIG.API_URL}/abilities`;
