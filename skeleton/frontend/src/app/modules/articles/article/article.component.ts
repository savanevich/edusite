import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MatDialog } from '@angular/material';

import { Article } from '../article';
import { AuthService } from '../../auth/auth.service';
import { User } from '../../user/user';
import { DialogComponent } from '../../common/dialog/dialog.component';
import { ArticleService } from '../article.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  @Input() article: Article;

  public authenticatedUser: User;

  constructor(
    public dialog: MatDialog,
    private authService: AuthService,
    private router: Router,
    private articleService: ArticleService
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
    this.router.navigate(['/articles/', this.article.id, 'edit'])
  }

  onDelete() {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        title: 'Delete the article',
        content: 'Are you sure you want to delete the article?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.articleService.removeArticle(this.article);
      }
    });
  }
}
