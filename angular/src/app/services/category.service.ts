import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  url = 'http://localhost:3000';
  get(id: string) {
    return this.httpClient.get(`${this.url}/category/${id}`);
  }
  constructor(private httpClient: HttpClient, private auth: AuthService) {}
  getAll() {
    const headers = { Authorization: 'Bearer ' + this.auth.getToken() };
    return this.httpClient.get(`${this.url}/category`, { headers });
  }
  save(category: Category) {
    return this.httpClient.post(`${this.url}/category`, category);
  }
  update(id: string, category: Category) {
    return this.httpClient.put(`${this.url}/category/${id}`, category);
  }
  delete(id: string) {
    return this.httpClient.delete(`${this.url}/category/delete/${id}`);
  }
}
