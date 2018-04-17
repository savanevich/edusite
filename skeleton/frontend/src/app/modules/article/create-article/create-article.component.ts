import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ArticleService } from '../article.service';
import { CategoryService } from '../../category/category.service';
import { Category } from '../../category/category';

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

  constructor(
    private formBuilder: FormBuilder,
    private articleService: ArticleService,
    private categoryService: CategoryService
  ) {
    this.createForm();
  }

  ngOnInit() {
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
    )
  }

  createForm() {
    this.articleForm = this.formBuilder.group({
      title: ['', [
        Validators.required
      ]],
      preview: ['', [
        Validators.required,
        Validators.minLength(10)
      ]],
      content: ['', [
        Validators.required,
        Validators.minLength(10)
      ]],
      categoryID: ['', [
        Validators.required
      ]]
    });
  }

  onSubmit() {
    this.articleService.createArticle(this.articleForm.value);
    this.articleForm.reset();
  }
}
