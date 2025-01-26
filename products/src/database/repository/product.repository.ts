import { Product } from "../models/product";

export class ProductRepository {
  async createProduct(data: any) {
    return Product.create(data);
  }
  async findAllProducts() {
    return Product.find();
  }
  // productById
  async productById(id: string) {
    return Product.findById(id);
  }
  // fetchByCategory
    async fetchByCategory(category: string) { 
      const result = Product.find({ type: category });
      console.log("result", result);
      return result;
      
  }
}