import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private authService: AuthService, private router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      pass: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {}

  onLogin() {
    if (this.loginForm.invalid) {
      alert('Vui lòng nhập thông tin hợp lệ');
      return;
    }

    const user = {
      email: this.loginForm.get('email')?.value,
      pass: this.loginForm.get('pass')?.value,
    };

    this.authService.login(user).subscribe(
      (data: any) => {
        console.log(data);
        alert('Đăng nhập thành công');
        localStorage.setItem('accessToken', data.accessToken); // Lưu token vào localStorage
        if (data) {
          localStorage.setItem('login', JSON.stringify(data)); // Lưu thông tin người dùng vào localStorage
        } else {
          console.warn('Error');
        }
        // Điều hướng sau khi đăng nhập thành công và tải lại trang
        this.router.navigate(['/home']).then(() => {
          window.location.reload();
        });
      },
      (error) => {
        console.error('Error:', error);
        alert('Sai tên đăng nhập hoặc mật khẩu');
      }
    );
  }
}
