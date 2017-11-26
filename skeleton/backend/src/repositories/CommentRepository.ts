import { Repository } from 'typeorm';

import DbConnector from '../utils/db/DbConnector';
import BaseRepository from './BaseRepository';
import Comment from '../entities/Comment';
import EntityNotFoundError from '../errors/EntityNotFoundError';

class CommentRepository extends BaseRepository {
    private static instance: CommentRepository;

    public static readonly SELECT_ROWS = [
        'comment.id',
        'comment.body',
        'comment.deleted',
        'comment.userId',
        'comment.articleId'
    ];

    private async getRepository(): Promise<Repository<Comment>> {
        const connection = await DbConnector.getConnection();

        return connection.getRepository(Comment);
    }

    public static getInstance(): CommentRepository {
        if (!CommentRepository.instance) {
            CommentRepository.instance = new CommentRepository();
        }

        return CommentRepository.instance;
    }

    public async save(comment: Comment): Promise<Comment> {
        const repository = await this.getRepository();

        //noinspection TypeScriptUnresolvedFunction
        return repository.save(comment);
    }

    public async findOneByID(id: number): Promise<Comment | undefined> {
        const repository = await this.getRepository();

        const comment = repository
            .createQueryBuilder('comment')
            .select(CommentRepository.SELECT_ROWS)
            .where('comment.deleted = :deleted', { deleted: false })
            .andWhere('comment.id = :id', { id: id })
            .getOne();

        if (!comment) {
            throw new EntityNotFoundError('Comment with this id doesn\'t exist.');
        }

        return comment;
    }

    public async findCommentsByArticle(articleID: number): Promise<Comment[] | undefined> {
        const repository = await this.getRepository();

        return repository
            .createQueryBuilder('comment')
            .select(CommentRepository.SELECT_ROWS)
            .where('comment.deleted = :deleted ' +
                'AND comment.articleId = :articleID',
                { articleID, deleted: false })
            .getMany();
    }
}

export default CommentRepository.getInstance();
