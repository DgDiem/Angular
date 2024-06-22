import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Import Router
import { Products } from 'src/app/models/products';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-listpro',
  templateUrl: './listpro.component.html',
  styleUrls: ['./listpro.component.css'],
})
export class ListproComponent implements OnInit {
  products!: Products[];
  constructor(
    private productsService: ProductsService,
    private router: Router // Inject Router vào constructor
  ) {}
  ngOnInit() {
    return this.productsService.getAll().subscribe((data) => {
      this.products = data as Products[];
    });
  }

  deleteProduct(id: string) {
    var result = confirm('Bạn có chắc muốn xóa??');
    if (result) {
      this.productsService.delete(id).subscribe((data) => {
        console.log(data);
        this.router.navigate(['/listpro']).then(() => {
          window.location.reload();
        });
      });
    }
  }
}
