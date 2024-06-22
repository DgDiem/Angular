import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Products } from 'src/app/models/products';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  productForm!: FormGroup;
  id: string;
  product!: Products;
  proRelated!: Products[];
  constructor(
    private productService: ProductsService,
    private route: ActivatedRoute
  ) {
    this.id = route.snapshot.params['id'];
    console.log(`id : ${this.id}`);
  }

  ngOnInit() {
    this.loadRelated();
    this.productForm = new FormGroup({
      name: new FormControl('', Validators.required),
      img: new FormControl(''),
      price: new FormControl('', Validators.required),
      quantity: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
    });

    this.productService.get(this.id).subscribe({
      next: (data) => {
        console.log('Product data:', data);
        this.product = data as Products;
        this.productForm.patchValue({
          name: this.product.name,
          img: this.product.img,
          price: this.product.price,
          quantity: this.product.quantity,
          description: this.product.description,
          category: this.product.category.categoryName,
        });
      },
      error: (err) => {
        console.error('Lỗi khi tải sản phẩm', err);
      },
    });
  }
  loadRelated() {
    this.productService.getRelated(this.id).subscribe((data) => {
      this.proRelated = data as Products[];
    });
  }
}
