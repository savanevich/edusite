import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { ArticleService } from '../article.service';
import { CategoryService } from '../../category/category.service';
import { Category } from '../../category/category';
import { Article } from '../article';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.css']
})
export class CreateArticleComponent implements OnInit {

  @Output() createArticleErrors: EventEmitter<Category[]> = new EventEmitter();
  @Output() categories: EventEmitter<string[]> = new EventEmitter();

  public articleForm: FormGroup;
  public errors: string[] = [];
  public categoriesData: Category[] = [];
  public isNew: boolean = false;

  private subscription: Subscription;
  private articleID: number;
  private article: Article;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private articleService: ArticleService,
    private categoryService: CategoryService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(
      (params: any) => {
        if (params.hasOwnProperty('id')) {
          this.isNew = false;
          this.articleID = +params['id'];
          this.articleService.fetchArticle(this.articleID);
        } else {
          this.isNew = true;
        }

        this.initForm();
      }
    );

    this.categoryService.fetchCategories();

    this.articleService.createArticleErrors.subscribe(
      (errors: string[]) => {
        this.errors = errors
      }
    );
    this.categoryService.categories.subscribe(
      (categoriesData: Category[]) => {
        this.categoriesData = categoriesData;
      }
    );
    this.articleService.getArticleEvent.subscribe(
      (article: Article) => {
        this.article = article;
        this.initForm();
      }
    );
  }

  private initForm() {
    let title = '';
    let preview = '';
    let content = '';
    let categoryID = 0;

    if (!this.isNew && this.article) {
      title = this.article.title;
      preview = this.article.preview;
      content = this.article.content;
      categoryID = this.article.category.id;
    }

    this.articleForm = this.formBuilder.group({
      title: [title, [
        Validators.required
      ]],
      preview: [preview, [
        Validators.required,
        Validators.minLength(10)
      ]],
      content: [content, [
        Validators.required,
        Validators.minLength(10)
      ]],
      categoryID: [categoryID, [
        Validators.required
      ]]
    });
  }

  onSubmit() {
    if (this.isNew) {
      this.articleService.createArticle(this.articleForm.value);

      this.articleForm.reset();
    } else {
      this.articleService.updateArticle(this.articleID, this.articleForm.value)
    }
  }
}
