import { NextFunction, Request, Response } from "express";
import { ProductService } from "../services/product.service";
import { PublishCustomerEvent, PublishShoppingEvent } from "../utility";

export class ProductController {
  private productService: ProductService;
  constructor() {
    this.productService = new ProductService();
  }
  createProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.productService.addNewProduct(req.body);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  };
  // FIND_PRODUCTS
  findProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.productService.getAllProducts();
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };
  productById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const result = await this.productService.findProductById(id);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };
  // productByCategory
  productByCategory = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { category } = req.params;
      const result = await this.productService.findByProductCategory(category);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };
  //
  addProductToWishlist = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const customer = req.user;
    try {
      const result = await this.productService.getProductPayload(
        customer?._id as string,
        { productId: req.body._id },
        "ADD_TO_WISHLIST"
      );
      console.log("result-->", result);

      PublishCustomerEvent(result);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };
  // remove from wishlist
  removeFromToWishlist = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const customer = req.user;
    const productId = req.params.id;
    try {
      const result = await this.productService.getProductPayload(
        customer?._id as string,
        productId,
        "REMOVE_FROM_WISHLIST"
      );
      console.log("result from removeFromToWishlist -->", result);

      PublishCustomerEvent(result);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };
  // add to cart
  // addProductToCart
  addProductToCart = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const customer = req.user;
    try {
      const result = await this.productService.getProductPayload(
        customer?._id as string,
        { productId: req.body._id, qty: req.body.qty },
        "ADD_TO_CART"
      );
      console.log("result from addProductToCart -->", result);

      PublishCustomerEvent(result);
      // if product added to cart means shopping will comes in picture
      PublishShoppingEvent(result);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };
  // removeProductFromCart
  removeProductFromCart = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
      const customer = req.user;
      const productId = req.params.id
    try {
      const result = await this.productService.getProductPayload(
        customer?._id as string,
         productId,
        "REMOVE_FROM_CART"
      );
      console.log("result from addProductToCart -->", result);

      PublishCustomerEvent(result);
      // if product added to cart means shopping will comes in picture
      PublishShoppingEvent(result);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };
}
export const productController = new ProductController();