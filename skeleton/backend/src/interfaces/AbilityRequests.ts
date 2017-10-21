export interface CreateAbilityRequest {
    name: string;
    categoryID: number;
}

export interface UpdateAbilityRequest {
    name?: string;
    categoryID: number;
}

