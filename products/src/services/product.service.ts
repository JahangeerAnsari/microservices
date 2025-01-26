import { ProductInputs } from "../database/dto/product.dto";
import { ProductRepository } from "../database/repository/product.repository";
import { BadRequestError } from "../utility";

export class ProductService {
  private productRepository: ProductRepository;
  constructor() {
    this.productRepository = new ProductRepository();
  }
  async addNewProduct(Input: ProductInputs) {
    const { available, banner, desc, name, price, suplier,type,unit } = Input;
    const product = await this.productRepository.createProduct({
      available,
      banner,
      desc,
      name,
      price,
      suplier,
      type,
      unit,
    });
      if (product) {
           const productResult = await product.save();
           return productResult;
      }
      throw new BadRequestError('Failed to Create new Product');
  }
}
