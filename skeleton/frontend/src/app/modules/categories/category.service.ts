import { Injectable, EventEmitter } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';

import { GET_CATEGORIES_API } from './category.constants';
import { Category } from './category';

@Injectable()
export class CategoryService {
  public categories = new EventEmitter<Category[]>();

  private headers;
  private categoriesData: Category[] = [];

  constructor(private http: Http) {
    this.headers = new Headers({
      'Content-Type': 'application/json',
    });
  }

  getCategories() {
    return this.categoriesData;
  }

  fetchCategories() {
    const options = new RequestOptions({ headers: this.headers });

    return this.http.get(GET_CATEGORIES_API, options)
      .map((response: Response) => response.json())
      .subscribe(
        ((response) => {
          if (response.hasOwnProperty('success') && response.success) {
            const categories = response.data.categories;

            this.categoriesData = categories;
            this.categories.emit(categories);
          }
        }));
  }
}
