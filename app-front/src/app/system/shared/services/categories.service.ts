import {BaseApi} from "../../../shared/core/base-api";
import {Http} from "@angular/http";
import {Injectable} from "@angular/core";
import {Category} from "../models/category.model";
import {Observable} from "rxjs/Rx";

@Injectable()
export class CategoriesService extends BaseApi{
  constructor (public http: Http) {
    super(http);
  }

  addCategory (category: Category): Observable<Category> {
    return this.post('categories', category);
  }

  getCategories(): Observable<Category[]> {
    return this.get('categories');
  }

  updateCategories(category: Category): Observable<Category> {
    return this.put(`categories/${category.id}`, category);
  }

  getCategoryById(id: string): Observable<Category> {
    return this.get(`categories/${id}`);
  }
}
