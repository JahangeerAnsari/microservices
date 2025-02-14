import { AuthPayload } from "../dto/Auth.dto";
import {
  AdressInputs,
  CartInputs,
  CreateCustomerInputs,
  CustomerLoginInputs,
  CustomerPayload,
  OrderInputs,
  ProductInputs,
} from "../dto/customer.dto";
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
    const customer = await this.customerRepository.findCustomer("", c?._id);
    if (customer) {
      return customer.address;
    }
    throw new BadRequestError("Customer not present for this id");
  }
  // getCustomerWishList
  async getCustomerWishList(c: AuthPayload | undefined) {
    //  find customer with cid
    const customer = await this.customerRepository.findWishListById(c?._id);
    if (customer) {
      return customer.wishlist;
    }
    throw new BadRequestError("Unable to get the wishlist");
  }
  // add product to wishlist
  async addToWishlist(c: AuthPayload | undefined, input: ProductInputs) {
    const { _id, available, banner, description, name, price } = input;
    const product = {
      _id,
      available,
      banner,
      description,
      name,
      price,
    };
    //  find customer with cid
    const customer = await this.customerRepository.findWishListById(c?._id);
    if (customer) {
      let wishlist = customer.wishlist;
      if (wishlist.length > 0) {
        let isExits = false;
        wishlist.map((item) => {
          if (item._id.toString() === product._id.toString()) {
            const index = wishlist.indexOf(item);
            wishlist.splice(index, 1);
            isExits = true;
          }
        });
        if (isExits) {
          wishlist.push(product);
        }
      } else {
        wishlist.push(product);
      }
      customer.wishlist = wishlist;
      const customerResult = await customer.save();
      return customerResult.wishlist;
    }
    throw new BadRequestError("Unable to get the wishlist");
  }
  // myCartItems
  async myCartItems(
    c: AuthPayload | undefined,
    input:CartInputs,
    qty: number,
    isRemove:boolean
  ) {
    //  find customer with cid
    const { _id, banner, name, price } = input;
    const customer = await this.customerRepository.findCustomerCartById(c?._id);
    if (customer) {
      const cartItem = {
        product: {
          _id,
          banner,
          name,
          price,
        },
        unit: qty,
      };
      let cartItems = customer.cart;
      if (cartItems.length > 0) {
        let isExits = false;
        cartItems.map((item) => {
          if (item.product._id.toString() === _id.toString()) {
            if (isRemove) {
              cartItems.slice(cartItems.indexOf(item), 1);
            } else {
              item.unit = qty;
            }
            isExits = true;
          }
        });
        if (!isExits) {
          cartItems.push(cartItem);
        } else {
          cartItems.push(cartItem);
        }
      }
      customer.cart = cartItems;
      return await customer.save();
    }

    throw new BadRequestError("Unable to get the wishlist");
  }
  // ADD_ORDER_TO_CUSTOMER
  async addOrderToProfile(c: AuthPayload | undefined, order: OrderInputs) {
    //  find customer with cid
    const customer = await this.customerRepository.findCustomerById(c?._id);
    if (customer) {
      let emptyOrder: any = [];
      let emptyCart: any = [];
      if (customer.orders == undefined) {
        customer.orders = emptyOrder;
      }
      // we can push our order to customer orders
      customer.orders.push(order);
      // order placed remove from the cart
      customer.cart = emptyCart;
      // update the customer profile
      const updateProfile = await customer.save();
      return updateProfile;
    }

    throw new BadRequestError("Unable to get the wishlist");
  }

  async SubscribeEvents(payload: any) {
    const { event, data } = payload;
    const { customerId, product, order, qty } = data;
    switch (event) {
      case "ADD_TO_WISHLIST":
      case "REMOVE_FROM_WISHLIST":
        this.addToWishlist(customerId, product);
        break;
      case "ADD_TO_CART":
        this.myCartItems(customerId, product, qty, false);
        break;
      case "REMOVE_FROM_CART":
        this.myCartItems(customerId, product, qty, true);
        break;
      case "CREATE_ORDER":
        this.addOrderToProfile(customerId, order);
        break;
      case "TEST":
        console.log("WORKING TEST");
        break;
      default:
        console.log(`Unknown event: ${event}`);
        break;
    }
  }
}
