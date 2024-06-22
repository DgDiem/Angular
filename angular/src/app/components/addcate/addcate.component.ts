import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
import { NavigationStart, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-addcate',
  templateUrl: './addcate.component.html',
  styleUrls: ['./addcate.component.css'],
})
export class AddcateComponent implements OnInit {
  categoryForm!: FormGroup;
  category!: Category;
  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) {
    this.category = new Category();
    this.categoryForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }
  ngOnInit() {}
  onSubmit() {
    if (this.categoryForm.invalid) {
      alert('Vui lòng nhập thông tin hợp lệ');
      return console.log('Không hợp lệ');
    } else {
      this.category.name = this.categoryForm.get('name')?.value;

      this.categoryService.save(this.category).subscribe((data) => {
        console.log(data);
        this.router.navigate(['/listcate']);
      });
    }
  }
}
