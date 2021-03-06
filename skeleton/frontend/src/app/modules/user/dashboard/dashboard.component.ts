import { Component, OnInit } from '@angular/core';

import { ArticleService } from '../../articles/article.service';
import { Article } from '../../articles/article';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public articles: Article[] = [];

  constructor(
    private articleService: ArticleService
  ) { }

  ngOnInit() {
    this.articleService.fetchArticles();

    this.articleService.getArticlesEvent.subscribe((articles: Article[]) => {
      this.articles = this.articleService.getArticles();
    });
  }

}
