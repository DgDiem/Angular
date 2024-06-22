import { ProductsService } from './../../services/products.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { Products } from 'src/app/models/products';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-addpro',
  templateUrl: './addpro.component.html',
  styleUrls: ['./addpro.component.css'],
})
export class AddproComponent implements OnInit {
  productForm: FormGroup;
  category: Category[] = [];
  selectedFile: File | null = null;

  constructor(
    private productService: ProductsService,
    private categoryService: CategoryService,
    private router: Router
  ) {
    this.productForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(6)]),
      img: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      quantity: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    this.categoryService.getAll().subscribe((data) => {
      this.category = data as Category[];
    });
  }
  onFileSelected(event: any) {
    this['selectedFile'] = event.target.files[0];
  }

  onSubmit() {
    if (this.productForm.invalid) {
      alert('Vui lòng nhập thông tin hợp lệ');
      console.log('Không hợp lệ');
      return;
    }
    const formData = new FormData();
    formData.append('name', this.productForm.get('name')?.value);
    if (this['selectedFile']) {
      formData.append('img', this['selectedFile']);
    }
    formData.append('price', this.productForm.get('price')?.value);
    formData.append('quantity', this.productForm.get('quantity')?.value);
    formData.append('description', this.productForm.get('description')?.value);
    formData.append('category', this.productForm.get('category')?.value);

    this.productService.save(formData).subscribe((data) => {
      console.log(data);
      this.router.navigate(['/listpro']);
    });
  }
}
