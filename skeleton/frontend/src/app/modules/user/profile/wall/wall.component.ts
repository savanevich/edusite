import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UserService } from '../../user.service';
import {Article} from "../../../article/article";

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
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.router.params.subscribe((params) => {
      this.userId = +params['id'];
      this.userService.fetchUserArticles(this.userId.toString());
    });

    this.userService.userArticlesEvent.subscribe((articles: Article[]) => {
      this.userArticles = articles;
    });

    this.userArticles = this.userService.getUserArticles();
  }

}
