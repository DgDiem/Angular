import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
import { Router } from '@angular/router'; // Import Router
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-listcategory',
  templateUrl: './listcategory.component.html',
  styleUrls: ['./listcategory.component.css'],
})
export class ListcategoryComponent implements OnInit {
  categories!: Category[];
  constructor(
    private categoryService: CategoryService,
    private router: Router, // Inject Router vào constructor
    private auth: AuthService
  ) {
    if (!this.auth.checkAdmin()) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    return this.categoryService.getAll().subscribe(
      (data) => {
        this.categories = data as Category[];
      },
      (error: any) => {
        console.log(error);
        if (error && error.status === 500) {
          // access token hết hạn, lấy lại new access token từ refresh token
          try {
            const refreshToken = this.auth.getRefeshToken();
            console.log(refreshToken);
            if (!refreshToken) {
              // nếu refresh token không có thì redirect về trang login
              this.router.navigate(['/login']);
              return;
            }

            // gọi API refresh token lấy new access token
            this.auth.refreshToken({ refreshToken: refreshToken }).subscribe(
              (res: any) => {
                console.log(res);
                // cập nhật the access token và refresh token
                const jsonData = JSON.stringify(res);
                localStorage.setItem('login', jsonData);

                // gọi API lấy danh sách danh mục
                this.categoryService.getAll().subscribe((data) => {
                  this.categories = data as Category[];
                });
              },
              (refreshError: any) => {
                console.error('Error during refresh token', refreshError);
                this.router.navigate(['/login']);
              }
            );
          } catch (error) {
            console.error('Error', error);
            this.router.navigate(['/login']);
          }
        } else {
          console.error('Error', error);
          throw error;
        }
      }
    );
  }

  deleteCategory(id: string) {
    var result = confirm('Bạn có chắc muốn xóa??');
    if (result) {
      this.categoryService.delete(id).subscribe((data) => {
        console.log(data);
        this.router.navigate(['/listcate']).then(() => {
          window.location.reload();
        });
      });
    }
  }
}
