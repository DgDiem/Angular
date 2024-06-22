import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { Products } from 'src/app/models/products';
import { CategoryService } from 'src/app/services/category.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-editpro',
  templateUrl: './editpro.component.html',
  styleUrls: ['./editpro.component.css'],
})
export class EditproComponent implements OnInit {
  id: string;
  productForm: FormGroup;
  category!: Category[];
  product!: Products;
  selectedFile: File | null = null;
  oldImageUrl: string = '';

  constructor(
    private productService: ProductsService,
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.id = route.snapshot.params['id'];
    console.log(`id : ${this.id}`);

    this.productForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      price: new FormControl('', Validators.required),
      quantity: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    this.productService.get(this.id).subscribe({
      next: (data) => {
        console.log('Product data:', data);
        this.product = data as Products;
        this.oldImageUrl = this.product.img ? this.product.img : ''; // Nếu không có ảnh, gán chuỗi rỗng
        this.productForm.patchValue({
          name: this.product.name,
          price: this.product.price,
          quantity: this.product.quantity,
          description: this.product.description,
          category: this.product.category.categoryId, // Gán giá trị categoryId
        });
      },
      error: (err) => {
        console.error('Lỗi khi tải sản phẩm', err);
      },
    });

    this.categoryService.getAll().subscribe({
      next: (data) => {
        this.category = data as Category[];
      },
      error: (err) => {
        console.error('Lỗi khi tải danh mục', err);
      },
    });
  }

  onSubmit() {
    if (this.productForm.valid) {
      const formData = new FormData();
      formData.append('name', this.productForm.get('name')?.value);
      formData.append('price', this.productForm.get('price')?.value);
      formData.append('quantity', this.productForm.get('quantity')?.value);
      formData.append(
        'description',
        this.productForm.get('description')?.value
      );
      formData.append('category', this.productForm.get('category')?.value);
      if (this.selectedFile) {
        formData.append('img', this.selectedFile);
      } else {
        formData.append('img', this.oldImageUrl);
      }
      console.log(`imggggg:`, this.oldImageUrl);

      this.productService.update(this.id, formData).subscribe({
        next: (data) => {
          console.log(data);
          this.router.navigate(['/listpro']);
        },
        error: (err) => {
          console.error('Lỗi khi cập nhật sản phẩm', err);
        },
      });
    } else {
      alert('Vui lòng nhập thông tin hợp lệ');
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.selectedFile = input.files[0];
    }
  }
}
