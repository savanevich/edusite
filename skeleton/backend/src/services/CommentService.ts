import CommentRepository from '../repositories/CommentRepository';
import Comment from '../entities/Comment';
import { CommentRequest } from "../interfaces/CommentRequests";
import User from '../entities/User';
import Article from '../entities/Article';

class CommentService {

    private static instance: CommentService;

    public static getInstance(): CommentService {
        if (!CommentService.instance) {
            CommentService.instance = new CommentService();
        }

        return CommentService.instance;
    }

    public async getComments(article: Article): Promise<Comment[] | undefined> {
        return CommentRepository.findCommentsByArticle(article.id);
    }

    public async createComment(data: CommentRequest, user: User, article: Article): Promise<Comment> {
        const comment: Comment = await Comment.create(data, user, article);

        return CommentRepository.save(comment);
    }

    public async updateComment(comment: Comment, data: CommentRequest) {
        if (data.body) {
            comment.body = data.body;
        }

        await CommentRepository.save(comment);

        return comment;
    }

    public async removeComment(comment: Comment) {
        comment.isDeleted = true;

        await CommentRepository.save(comment);

        return comment;
    }

}

export default CommentService.getInstance();