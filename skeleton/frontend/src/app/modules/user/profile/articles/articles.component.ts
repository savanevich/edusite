import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Article } from '../../../articles/article';
import { ArticleService } from '../../../articles/article.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html'
})
export class ArticlesComponent implements OnInit {

  public userId: number;
  public userArticles: Article[];

  constructor(
    private router: ActivatedRoute,
    private articleService: ArticleService,
  ) { }

  ngOnInit() {
    this.router.params.subscribe((params) => {
      this.userId = +params['id'];
      this.articleService.fetchUserArticles(this.userId.toString());
    });

    this.articleService.getArticlesEvent.subscribe((articles: Article[]) => {
      this.userArticles = this.articleService.getArticles();
    });

    this.userArticles = this.articleService.getArticles();
  }

}
