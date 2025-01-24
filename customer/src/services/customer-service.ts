import { AuthPayload } from "../dto/Auth.dto";
import {  AdressInputs, CreateCustomerInputs, CustomerLoginInputs, CustomerPayload } from "../dto/customer.dto";
import { CustomerRepository } from "../repository";
import {
  BadRequestError,
  ConflictError,
  generateHashedPassword,
  generateSalt,
  generateSignature,
  NotFoundError,
  validatePassword,
} from "../utility";

export class CustomerService {
  private customerRepository: CustomerRepository;
  constructor() {
    this.customerRepository = new CustomerRepository();
  }
  async registerCustomer(input: CreateCustomerInputs) {
    const { email, password, phone, address, firstName, lastName } = input;
    const existingCustomer = await this.customerRepository.findCustomer(
      email,
      ""
    );
    if (existingCustomer) {
      throw new ConflictError(`User with email ${email} already exists`);
    }
    const salt = await generateSalt();
    const hashedPassword = await generateHashedPassword(password, salt);
    const userData = {
      email,
      salt,
      password: hashedPassword,
      phone,
      address,
      firstName,
      lastName,
      verified: false,
      lat: 0,
      lng: 0,
    };
    const result = await this.customerRepository.customerSignup(userData);
    if (result) {
      const signature = generateSignature({
        _id: result._id as string,
        email: result.email,
        verified: result.verified,
      });
      return {
        signature,
        email: result.email,
        verified: result.verified,
      };
    }
    throw new BadRequestError("Unable to produce result");
  }
  async loginCustomer(input: CustomerLoginInputs) {
    const { email, password } = input;
    // check email present inside our database
    const customer = await this.customerRepository.findCustomer(email, "");
    if (customer) {
      const customerValidate = await validatePassword(
        password,
        customer.password,
        customer.salt
      );
      if (customerValidate) {
        // lets generate signature for them
        const signature = generateSignature({
          _id: customer._id as string,
          verified: customer.verified,
          email: customer.email,
        });
        return {
          signature,
          email: customer.email,
          verified: customer.verified,
        };
      }
    }
    throw new BadRequestError("Invalid Email or Password!");
  }
  async createAddress(input: AdressInputs, c: AuthPayload | undefined) {
    //  find customer with cid
    const customer = await this.customerRepository.findCustomer("", c?._id);
    //customer have address no need to create otherwise create
    if (customer?.address.length > 0) {
      throw new ConflictError("Address also Present for this customer");
    } else {
      const newAddress = await this.customerRepository.customerAddress(input);
      customer?.address.push(newAddress);
      return await customer?.save();
    }
  }
  async getCustomer(c: AuthPayload | undefined) {
    //  find customer with cid
    const customer = await this.customerRepository.findCustomer("", c?._id)
     if (customer) {
      return customer;
    }
      throw new BadRequestError("Customer not present for this id");
  }
}