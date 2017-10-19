export interface CreateUserRequest {
    name: string;
    email: string;
    password: string;
    birthday?: string;
}

export interface UpdateUserRequest {
    name?: string;
    email?: string;
    birthday?: string;
}
