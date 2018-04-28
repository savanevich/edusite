export interface CreateArticleRequest {
    title: string;
    preview: string;
    content: string;
    coverUrl: string;
    categoryID: number;
    abilities: string[];
}

export interface UpdateArticleRequest {
    title?: string;
    preview?: string;
    content?: string;
    categoryID: number;
    abilities: string[];
}