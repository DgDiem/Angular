import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Products } from 'src/app/models/products';
import { ProductsService } from 'src/app/services/products.service';
import { Category } from '../../models/category';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: Products[] = [];
  searchQuery: string = '';
  route: any;

  constructor(
    private productsService: ProductsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadAllProducts();
    this.route.queryParams.subscribe((params: { [x: string]: string }) => {
      this.searchQuery = params['search'] || '';
      if (this.searchQuery) {
        this.searchProducts();
      } else {
        this.loadAllProducts();
      }
    });
  }
  loadAllProducts() {
    this.productsService.getAll().subscribe((data) => {
      this.products = data as Products[];
    });
  }
  loadProductsByCategory(categoryId: string) {
    this.productsService.getByCategoryId(categoryId).subscribe((data) => {
      this.products = data;
    });
  }
  loadA() {
    this.productsService.getAscending().subscribe((data) => {
      this.products = data as Products[];
    });
  }
  loadD() {
    this.productsService.getDescending().subscribe((data) => {
      this.products = data as Products[];
    });
  }

  // searchProducts() {
  //   if (this.searchQuery.trim() !== '') {
  //     this.productsService.searchByName(this.searchQuery).subscribe((data) => {
  //       this.products = data;
  //     });
  //   } else {
  //     this.loadAllProducts();
  //   }
  // }
  searchProducts() {
    if (this.searchQuery.trim() !== '') {
      this.productsService.getAll().subscribe((data) => {
        this.products = (data as Products[]).filter((product) =>
          product.name
            .toLowerCase()
            .includes(this.searchQuery.trim().toLowerCase())
        );
      });
    } else {
      this.loadAllProducts();
    }
  }
  onSortChange(event: Event) {
    const sortOption = (event.target as HTMLSelectElement).value;
    if (sortOption === 'asc') {
      this.loadA();
    } else if (sortOption === 'desc') {
      this.loadD();
    } else {
      this.loadAllProducts();
    }
  }
}
