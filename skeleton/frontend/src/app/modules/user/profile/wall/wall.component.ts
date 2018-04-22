import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Article } from '../../../article/article';
import { ArticleService } from '../../../article/article.service';

@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.css']
})
export class WallComponent implements OnInit {

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
