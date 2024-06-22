import { CategoryService } from './../../services/category.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-editcate',
  templateUrl: './editcate.component.html',
  styleUrls: ['./editcate.component.css'],
})
export class EditcateComponent implements OnInit {
  categoryForm!: FormGroup;
  category!: Category;
  id: string;

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private router: Router
  ) {
    this.id = route.snapshot.params['id'];
    console.log(`id : ${this.id}`);

    this.categoryForm = new FormGroup({
      _id: new FormControl(this.id, Validators.required),
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    });
  }
  ngOnInit() {
    this.categoryService.get(this.id).subscribe((data) => {
      this.category = data as Category;
      this.categoryForm.patchValue({
        name: this.category.name, // Gán giá trị name từ category vào form
      });
    });
  }
  onSubmit() {
    if (this.categoryForm.valid) {
      this.categoryService
        .update(this.id, this.categoryForm.value)
        .subscribe((data) => {
          console.log(data);
          this.router.navigate(['/listcate']);
        });
    } else {
      alert('Vui lòng nhập thông tin hợp lệ');
    }
  }
}
