import {Component, Input, OnInit} from '@angular/core';
import {CONFIG} from "../../../../../config/config";
import {Comment} from "../../../comment";
import {User} from "../../../../user/user";
import {AuthService} from "../../../../auth/auth.service";
import {DialogComponent} from "../../../../common/dialog/dialog.component";
import {ArticleService} from "../../../article.service";
import {MatDialog} from "@angular/material";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input() comment: Comment;

  public staticUrl = CONFIG.STATIC_URL;
  public authenticatedUser: User;
  public articleId: number;

  constructor(
    private authService: AuthService,
    private articleService: ArticleService,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.authenticatedUser = this.authService.getAuthUser();
    this.authService.authSuccess.subscribe((user: User) => {
      this.authenticatedUser = user;
    });

    this.route.params.subscribe(
      (params: any) => {
        if (params.hasOwnProperty('id')) {
          this.articleId = +params['id'];
        }
      }
    );
  }

  public isCommentCanBeModified() {
    return this.comment && this.authenticatedUser && this.comment.user.id === this.authService.getAuthUserId();
  }

  public onDelete() {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        title: 'Delete the comment',
        content: 'Are you sure you want to delete the comment?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.articleService.removeComment(this.comment, this.articleId);
      }
    });
  }
}
