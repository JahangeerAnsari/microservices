import { NextFunction, Request, Response } from "express";
import { ProductService } from "../services/product.service";

export class ProductController{

    private productService: ProductService;
    constructor() {
        this.productService = new ProductService()
    }
    createProduct = async(req:Request, res:Response, next:NextFunction) => {
        try {
            const result = await this.productService.addNewProduct(req.body);
            res.status(201).json(result)
        } catch (error) {
           next(error) 
        }
    }
}
export const productController = new ProductController();