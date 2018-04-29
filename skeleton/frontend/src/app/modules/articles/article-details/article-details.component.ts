import { Component, OnInit } from '@angular/core';
import { Subscription } from "rxjs/Subscription";

import { CONFIG } from '../../../config/config';
import { ArticleService } from "../article.service";
import { ActivatedRoute } from "@angular/router";
import {Article} from "../article";

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.css']
})
export class ArticleDetailsComponent implements OnInit {

  public staticUrl = CONFIG.STATIC_URL;
  public articleId: number;
  public article: Article;

  private subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService
  ) {
    this.article = new Article('', '', '', 0);
  }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(
      (params: any) => {
        if (params.hasOwnProperty('id')) {
          this.articleId = +params['id'];
          this.articleService.fetchArticle(this.articleId);
          this.article = this.articleService.getArticle();
        }
      }
    );

    this.articleService.getArticleEvent.subscribe(
      (article: Article) => {
        this.article = article;
      }
    );
  }

}
