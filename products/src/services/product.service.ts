import { ProductInputs } from "../database/dto/product.dto";
import { ProductRepository } from "../database/repository/product.repository";
import { BadRequestError } from "../utility";

export class ProductService {
  private productRepository: ProductRepository;
  constructor() {
    this.productRepository = new ProductRepository();
  }
  async addNewProduct(Input: ProductInputs) {
    const { available, banner, desc, name, price, suplier, type, unit } = Input;
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
    throw new BadRequestError("Failed to Create new Product");
  }
  async getAllProducts() {
    const products = await this.productRepository.findAllProducts();
    if (products) {
      let categories: any = {};
      products.map(({ type }) => {
        categories[type] = type;
      });
      return { products, categories: Object.keys(categories) };
    }
    throw new BadRequestError("Unable to find products");
  }

  // findProductById
  async findProductById(id: string) {
    const product = await this.productRepository.productById(id);
    if (product) {
      return product;
    }
    throw new BadRequestError(`Unable to find product with id : ${id}`);
  }
  // findByProductCategory
  async findByProductCategory(category: string) {
    const product = await this.productRepository.fetchByCategory(category);
    console.log("product", product);

    if (product) {
      return product;
    }
    throw new BadRequestError(`Unable to find product with this; ${category} `);
  }
  // getProductPayload
    async getProductPayload(customerId:string,{productId,qty}:any,event:any) {
    const product = await this.productRepository.productById(productId);
    console.log("product", product);

    if (product) {
        const payload = {
          event: event,
          data: { customerId , product,qty},
        };
        return payload
    }
    throw new BadRequestError(`Unable to ceate product payload `);
  }
}
