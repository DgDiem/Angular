export class Products {
  _id!: string;
  name!: string;
  img!: string;
  price!: number;
  quantity!: number;
  hot!: number;
  view!: number;
  description!: string;
  category!: { categoryId: Object; categoryName: string };
}
