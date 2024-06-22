import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

// ,
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ListcategoryComponent } from './components/listcategory/listcategory.component';
import { HomeComponent } from './components/homes/home.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ListproComponent } from './components/listpro/listpro.component';
import { AddcateComponent } from './components/addcate/addcate.component';
import { AddproComponent } from './components/addpro/addpro.component';
import { EditcateComponent } from './components/editcate/editcate.component';
import { EditproComponent } from './components/editpro/editpro.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductsComponent } from './components/products/products.component';
import { RegisterComponent } from './components/register/register.component';
import { GuardService } from './auth/guard';
import { AccountComponent } from './components/account/account.component';
import { GuardAdmin } from './auth/guard.admin';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'admin', component: DashboardComponent, canActivate: [GuardAdmin] },
  {
    path: 'listcate',
    component: ListcategoryComponent,
    canActivate: [GuardAdmin],
  },
  { path: 'addcate', component: AddcateComponent, canActivate: [GuardAdmin] },
  {
    path: 'editcate/:id',
    component: EditcateComponent,
    canActivate: [GuardAdmin],
  },
  { path: 'listpro', component: ListproComponent, canActivate: [GuardAdmin] },
  { path: 'addpro', component: AddproComponent, canActivate: [GuardAdmin] },
  {
    path: 'editpro/:id',
    component: EditproComponent,
    canActivate: [GuardAdmin],
  },
  { path: 'detail/:id', component: ProductDetailComponent },
  { path: 'account', component: AccountComponent, canActivate: [GuardService] },
  { path: 'products', component: ProductsComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ListcategoryComponent,
    HomeComponent,
    LoginComponent,
    DashboardComponent,
    ListproComponent,
    AddcateComponent,
    AddproComponent,
    EditcateComponent,
    EditproComponent,
    ProductDetailComponent,
    ProductsComponent,
    RegisterComponent,
    AccountComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  /* Angular thường được sử dụng để phát triển ứng dụng đơn trang (SPA)
    và RouterModule được sử dụng để thiết lập định tuyến trong ứng dụng của bạn.
    Phương thức forRoot để nạp các thông tin của Routes
   */
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
