import { Component, OnInit } from '@angular/core';
import { User } from "../../../../user/user";
import { AuthService } from "../../../../auth/auth.service";
import { NgForm } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { ArticleService } from "../../../article.service";

@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.css']
})
export class CreateCommentComponent implements OnInit {

  public authenticatedUser: User;
  public articleId: number;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private articleService: ArticleService
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

  onSubmit(form: NgForm) {
    this.articleService.addCommentToArticle(form.value.comment, this.articleId);
    form.reset();
  }
}
