import { Injectable, EventEmitter } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/finally';

import { AuthService } from '../auth/auth.service';
import {
  CREATE_ARTICLE_URL,
  GET_USER_WALL,
  FETCH_ARTICLE,
  UPDATE_ARTICLE_URL,
  DELETE_ARTICLE_URL
} from './article.constants';
import { NotificationService } from '../notification/notification.service';
import { NgProgress } from 'ngx-progressbar';
import { Article } from './article';
import { FETCH_USER_ARTICLES } from '../user/user.constants';

@Injectable()
export class ArticleService {

  public createArticleErrors = new EventEmitter<string[]>();
  public getArticlesEvent = new EventEmitter<Article[]>();
  public getArticleEvent = new EventEmitter<Article>();
  public removeArticleEvent = new EventEmitter<number>();

  private articles: Article[] = [];
  private article: Article;
  private authHeaders: Headers;

  constructor(
    private authService: AuthService,
    private http: Http,
    private notificationService: NotificationService,
    private progress: NgProgress
  ) {
    this.authHeaders = new Headers({
      'Content-Type': 'application/json',
      'x-access-token': this.authService.getAuthToken()
    });
  }

  getArticles() {
    return this.articles;
  }

  fetchArticle(id: number) {
    const options = new RequestOptions({ headers: new Headers({'Content-type': 'application/json'}) });

    return this.http.get(FETCH_ARTICLE.replace(':id', id.toString()), options)
      .map((response: Response) => response.json())
      .subscribe(
        ((response) => {
          if (response.hasOwnProperty('success') && response.success) {
            this.getArticleEvent.emit(response.data.article);
            this.article = response.data.article;
          }
        }));
  }

  fetchArticles() {
    const options = new RequestOptions({ headers: this.authHeaders });

    return this.http.get(GET_USER_WALL, options)
      .map((response: Response) => response.json())
      .subscribe(
        ((response) => {
          if (response.hasOwnProperty('success') && response.success) {
            this.articles = response.data.articles;
            this.getArticlesEvent.emit(response.data.articles);
          }
        }));
  }

  fetchUserArticles(id: string) {
    const options = new RequestOptions({ headers: this.authHeaders });

    return this.http.get(FETCH_USER_ARTICLES.replace(':userID', id), options)
      .map((response: Response) => response.json())
      .subscribe(
        ((response) => {
          if (response.hasOwnProperty('success') && response.success) {
            this.articles = response.data.articles;
            this.getArticlesEvent.emit(response.data.articles);
          }
        }));
  }

  createArticle(article: Article) {
    const options = new RequestOptions({ headers: this.authHeaders });
    const body = {
      title: article.title,
      preview: article.preview,
      content: article.content,
      categoryID: article.categoryID
    };
    this.progress.start();

    return this.http.post(CREATE_ARTICLE_URL, body, options)
      .map((response: Response) => response.json())
      .finally(() => this.progress.done())
      .subscribe(
        ((response) => {
          if (response.hasOwnProperty('success') && response.success) {

            this.notificationService.notify(
              'Successfully added new article.',
              'success'
            );
          }
        }), ((response) => {
          this.createArticleErrors.emit(response.json().errors);
        })
      );
  }

  updateArticle(id: number, article: Article) {
    const options = new RequestOptions({ headers: this.authHeaders });
    const body = {
      title: article.title,
      preview: article.preview,
      content: article.content,
      categoryID: article.categoryID
    };
    this.progress.start();

    return this.http.put(UPDATE_ARTICLE_URL.replace(':id', id.toString()), body, options)
      .map((response: Response) => response.json())
      .finally(() => this.progress.done())
      .subscribe(
        ((response) => {
          if (response.hasOwnProperty('success') && response.success) {

            this.notificationService.notify(
              'Successfully updated article.',
              'success'
            );
          }
        }), ((response) => {
          this.createArticleErrors.emit(response.json().errors);
        })
      );
  }

  removeArticle(article: Article) {
    const options = new RequestOptions({ headers: this.authHeaders });
    const id = article.id;

    this.progress.start();

    return this.http.delete(DELETE_ARTICLE_URL.replace(':id', id.toString()), options)
      .map((response: Response) => response.json())
      .finally(() => this.progress.done())
      .subscribe(
        ((response) => {
          if (response.hasOwnProperty('success') && response.success) {
            const articleIndex = this.articles.indexOf(article);
            this.articles.splice(articleIndex, 1);

            this.notificationService.notify(
              'Successfully removed the article.',
              'success'
            );
          }
        }), ((response) => {
          this.notificationService.notify(
            'Failed removed the article.',
            'error'
          );
        })
      );
  }
}
