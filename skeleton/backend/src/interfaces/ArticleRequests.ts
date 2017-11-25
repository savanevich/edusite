export interface CreateArticleRequest {
    title: string;
    preview: string;
    content: string;
    coverUrl: string;
    categoryID: number;
}

export interface UpdateArticleRequest {
    title?: string;
    preview?: string;
    content?: string;
    categoryID: number;
}