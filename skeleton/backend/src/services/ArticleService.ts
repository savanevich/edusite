import ArticleRepository from '../repositories/ArticleRepository';
import Article from "../entities/Article";
import { CreateArticleRequest } from '../interfaces/ArticleRequests';
import Category from "../entities/Category";
import EntityNotFoundError from '../errors/EntityNotFoundError';
import User from "../entities/User";
import Ability from "../entities/Ability";

class ArticleService {

    private static instance: ArticleService;

    public static getInstance(): ArticleService {
        if (!ArticleService.instance) {
            ArticleService.instance = new ArticleService();
        }

        return ArticleService.instance;
    }

    public async getArticleByID(articleD: number): Promise<Article | undefined> {
        const article = ArticleRepository.findOneById(articleD);

        if (!article) {
            throw new EntityNotFoundError('Article with this id wasn\'t found.');
        }

        return article;
    }

    public async getArticles(): Promise<Article[] | undefined> {
        return ArticleRepository.findAll();
    }

    public async getArticlesByCategory(category: Category): Promise<Article[] | undefined> {
        return ArticleRepository.findByCategory(category.id);
    }

    public async getArticlesByUser(user: User): Promise<Article[] | undefined> {
        return ArticleRepository.findByUser(user.id);
    }

    public async createArticle(data: CreateArticleRequest, user: User, category: Category, abilities: Ability[]): Promise<Article> {
        const ability: Article = await Article.create(data, user, category, abilities);

        return ArticleRepository.save(ability);
    }

    public async updateArticle(currentArticle: Article, category: Category, abilities: Ability[], data: any): Promise<Article> {
        if (data.title) {
            currentArticle.title = data.title;
        }
        if (data.preview) {
            currentArticle.preview = data.preview;
        }
        if (data.content) {
            currentArticle.content = data.content;
        }
        currentArticle.category = category;
        currentArticle.abilities = abilities;

        await ArticleRepository.save(currentArticle);

        return currentArticle;
    }

    public async removeArticle(article: Article): Promise<Article> {
        article.deleted = true;

        await ArticleRepository.save(article);

        return article;
    }
}

export default ArticleService.getInstance();