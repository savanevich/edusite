import { Repository } from 'typeorm';
import DbConnector from '../utils/db/DbConnector';
import Article from '../entities/Article';
import BaseRepository from './BaseRepository';
import EntityNotFoundError from "../errors/EntityNotFoundError";

class ArticleRepository extends BaseRepository {
    private static instance: ArticleRepository;

    public static readonly SELECT_ROWS = [
        'article.id',
        'article.title',
        'article.preview',
        'article.content',
        'article.coverUrl',
        'article.viewsCounter',
        'article.createdAt',
    ];

    private async getRepository(): Promise<Repository<Article>> {
        const connection = await DbConnector.getConnection();

        return connection.getRepository(Article);
    }

    public static getInstance(): ArticleRepository {
        if (!ArticleRepository.instance) {
            ArticleRepository.instance = new ArticleRepository();
        }

        return ArticleRepository.instance;
    }

    public async save(article: Article): Promise<Article> {
        const repository = await this.getRepository();

        //noinspection TypeScriptUnresolvedFunction
        return repository.save(article);
    }

    public async findOneById(id: number): Promise<Article | undefined> {
        const repository = await this.getRepository();
        const article = await repository
            .createQueryBuilder('article')
            .select(ArticleRepository.SELECT_ROWS)
            .leftJoinAndSelect('article.category', 'category')
            .leftJoinAndSelect('article.user', 'user')
            .where('article.id = :id AND article.deleted = 0', { id })
            .getOne();

        if (!article) {
            throw new EntityNotFoundError('Article with this id doesn\'t exist.');
        }

        return article;
    }

    public async findAll(): Promise<Article[]> {
        const repository = await this.getRepository();

        return repository
            .createQueryBuilder('article')
            .select(ArticleRepository.SELECT_ROWS)
            .leftJoinAndSelect('article.category', 'category')
            .leftJoinAndSelect('article.user', 'user')
            .where('article.deleted = 0')
            .getMany();
    }

    public async findByCategory(categoryID: number): Promise<Article[] | undefined> {
        const repository = await this.getRepository();

        return repository
            .createQueryBuilder('article')
            .select(ArticleRepository.SELECT_ROWS)
            .innerJoinAndSelect('article.category', 'category')
            .leftJoinAndSelect('article.user', 'user')
            .where('article.category = :categoryID AND article.deleted = 0', { categoryID })
            .getMany();
    }

    public async findByUser(userID: number): Promise<Article[] | undefined>  {
        const repository = await this.getRepository();

        return repository
            .createQueryBuilder('article')
            .select(ArticleRepository.SELECT_ROWS)
            .innerJoinAndSelect('article.category', 'category')
            .leftJoinAndSelect('article.user', 'user')
            .where('article.user = :userID AND article.deleted = 0', { userID })
            .getMany();
    }

    public async remove(article: Article): Promise<Article> {
        const repository = await this.getRepository();

        return repository.remove(article);
    }
}

export default ArticleRepository.getInstance();
