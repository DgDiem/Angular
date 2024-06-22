import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Import Router
import { Products } from 'src/app/models/products';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  products: Products[] = [];
  proNew: Products[] = [];
  proHot: Products[] = [];
  proView: Products[] = [];

  constructor(
    private productsService: ProductsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadAllProducts();
    this.loadHotProducts();
    this.loadNewProducts();
    this.loadViewProducts();
  }

  loadAllProducts() {
    this.productsService.getAll().subscribe((data) => {
      this.products = data as Products[];
    });
  }

  loadHotProducts() {
    this.productsService.getHot().subscribe((data) => {
      this.proHot = data as Products[];
    });
  }

  loadNewProducts() {
    this.productsService.getNew().subscribe((data) => {
      this.proNew = data as Products[];
    });
  }
  loadViewProducts() {
    this.productsService.getView().subscribe((data) => {
      this.proView = data as Products[];
    });
  }
}
