import { Injectable, EventEmitter } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/finally';

import { AuthService } from '../auth/auth.service';
import { CREATE_ARTICLE_URL } from './article.constants';
import { NotificationService } from '../notification/notification.service';
import { NgProgress } from 'ngx-progressbar';
import { Article } from './article';


@Injectable()
export class ArticleService {

  public createArticleErrors = new EventEmitter<string[]>();
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
}
