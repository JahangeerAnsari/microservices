// The repository layer handles all interactions with the database.

import { Address } from "../models/address";
import { Customer } from "../models/customer";

export class CustomerRepository {
  async findCustomer(email: string, id: string | undefined) {
    if (email) {
      return await Customer.findOne({ email: email });
    } else {
      const customer = await Customer.findById(id).populate("address");
      return customer;
    }
  }
  async customerSignup(data: any) {
    return Customer.create(data);
  }
  async customerAddress(data: any) {
    const newAddress = await Address.create(data);

    return newAddress;
  }
   async findWishListById(id: string | undefined) {
       const customer = await Customer.findById(id).populate("wishlist");
       return customer;
  }
}