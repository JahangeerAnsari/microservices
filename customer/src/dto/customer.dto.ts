
export interface CreateCustomerInputs {
  email: string;
  password: string;
  phone: string;
  firstName: string;
  lastName: string;
  address: string;
  otp_expiry:Date
}
export interface CustomerLoginInputs {
  email: string;
  password: string;
}
export interface EditCustomerInputs {
 firstName: string;
  lastName: string;
  address: string;
}
export interface CustomerPayload{
    _id: string;
    email: string;
    verified:boolean

}
export interface OrderInputs{
  _id: string;
  unit:number
}
export interface ProductInputs{
  _id: string;
  name: string;
  description: string
  price: number;
  available: boolean;
  banner:string
}
export interface CartInputs {
  _id: string;
  name: string;
  price: number;
  banner: string;
  // qty: number;
  // isRemove:boolean
}
export interface OrderInputs {
  _id: string;
  amount: string;
  date: Date;
}

export interface AdressInputs {
  street: string;
  postalCode: string;
  city: string;
  country: string;
}
