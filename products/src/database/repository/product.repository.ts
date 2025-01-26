import { Product } from "../models/product";

export class ProductRepository{
    async createProduct(data:any) {
        return Product.create(data);
    }
}