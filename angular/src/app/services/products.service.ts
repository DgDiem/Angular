import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Products } from '../models/products';
import { Observable } from 'rxjs/internal/Observable';
@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  url = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) {}
  get(id: string) {
    return this.httpClient.get(`${this.url}/products/${id}`);
  }
  getAll() {
    return this.httpClient.get(`${this.url}`);
  }
  getNew() {
    return this.httpClient.get(`${this.url}/products/new`);
  }
  getHot() {
    return this.httpClient.get(`${this.url}/products/hot`);
  }
  getView() {
    return this.httpClient.get(`${this.url}/products/view`);
  }
  getRelated(id: string) {
    return this.httpClient.get(`${this.url}/products/related/${id}/related`);
  }
  save(product: FormData) {
    return this.httpClient.post(`${this.url}/products`, product);
  }
  update(id: string, formData: FormData) {
    return this.httpClient.put(`${this.url}/products/${id}`, formData);
  }
  delete(id: string) {
    return this.httpClient.delete(`${this.url}/products/${id}`);
  }
  getByCategoryId(categoryId: string): Observable<Products[]> {
    return this.httpClient.get<Products[]>(
      `${this.url}/category/categoryId/${categoryId}`
    );
  }
  searchByName(name: string): Observable<Products[]> {
    return this.httpClient.get<Products[]>(
      `${this.url}/products/search/name/${name}`
    );
  }
  getAscending() {
    return this.httpClient.get(`${this.url}/products/product/tang/dan`);
  }

  getDescending() {
    return this.httpClient.get(`${this.url}/products/product/giam/dan`);
  }
}
