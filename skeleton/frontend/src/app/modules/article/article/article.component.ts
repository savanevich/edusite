import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Article } from '../article';
import { AuthService } from '../../auth/auth.service';
import { User } from '../../user/user';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  @Input() article: Article;

  public authenticatedUser: User;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authenticatedUser = this.authService.getAuthUser();
    this.authService.authSuccess.subscribe((user: User) => {
      this.authenticatedUser = user;
    });
  }

  isArticleCanBeModified() {
    return this.article && this.authenticatedUser && this.article.user.id === this.authService.getAuthUserId();
  }

  onEdit() {
    this.router.navigate(['/article/', this.article.id, 'edit'])
  }

  onDelete() {

  }
}
