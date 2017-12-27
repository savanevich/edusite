import { CONFIG } from '../../../../config/config';

export const FOLLOW_USER = `${CONFIG.API_URL}/users/:userID/follow`;
export const UNFOLLOW_USER = `${CONFIG.API_URL}/users/:userID/unfollow`;
