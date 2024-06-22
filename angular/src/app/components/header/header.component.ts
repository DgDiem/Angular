import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  searchQuery: string = '';
  isLogin: any;
  isAdmin: any;

  constructor(private router: Router, private auth: AuthService) {
    this.isLogin = this.auth.checkLogin();
    this.isAdmin = this.auth.checkAdmin();
  }
  onLogout() {
    localStorage.clear();
    location.assign('/');
  }
  searchProducts() {
    if (this.searchQuery.trim() !== '') {
      this.router.navigate(['/products'], {
        queryParams: { search: this.searchQuery.trim() },
      });
    }
  }
  ngOnInit() {}
}
