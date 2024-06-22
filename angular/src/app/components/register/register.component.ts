import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private authService: AuthService, private router: Router) {
    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(6)]),
      pass: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  ngOnInit() {}

  onRegister() {
    if (this.registerForm.invalid) {
      alert('Vui lòng nhập thông tin hợp lệ');
      return;
    }

    const user = {
      name: this.registerForm.get('name')?.value,
      pass: this.registerForm.get('pass')?.value,
      phone: this.registerForm.get('phone')?.value,
      email: this.registerForm.get('email')?.value,
    };

    this.authService.register(user).subscribe(
      (data) => {
        console.log(data);
        alert('Đăng ký thành công');
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Error:', error);
        alert('Đăng ký thất bại');
      }
    );
  }
}
