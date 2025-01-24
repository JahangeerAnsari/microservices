import { Request, Response, NextFunction } from "express";
import { CustomerService } from "../services/customer-service";
export class CustomerController {
  private customerService: CustomerService;

  constructor() {
    this.customerService = new CustomerService();
  }
  // SIGNUP API
  customerSignup = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.customerService.registerCustomer(req.body);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  };
  // SIGNIN
  customerSignIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.customerService.loginCustomer(req.body);
      res.json(result);
    } catch (error) {
      next(error);
    }
  };
  //CREATE ADDRESS
  customerAddress = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const customer = req.user;
      const result = await this.customerService.createAddress(
        req.body,
        customer
      );
      res.json(result);
    } catch (error) {
      next(error);
    }
  };
  // GET ADDRESS
  customerById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const customer = req.user;
      const result = await this.customerService.getCustomer(customer);
      res.json(result);
    } catch (error) {
      next(error);
    }
  };
  myWishList = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const customer = req.user;
      const result = await this.customerService.getCustomerWishList(customer);
      res.json(result);
    } catch (error) {
      next(error);
    }
  };
  addProductToWishlist = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      
      const customer = req.user;
      const result = await this.customerService.addToWishlist(customer, req.body);
      res.json(result);
    } catch (error) {
      next(error);
    }
  };
}
export const customerController = new CustomerController();
