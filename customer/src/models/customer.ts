import mongoose , {Document, Schema, } from 'mongoose';

interface CustomerDoc extends Document {
  email: string;
  password: string;
  salt: string;
  address: any;
  firstName: string;
  lastName: string;
  phone: string;
  verified: boolean;
  otp: number;
  otp_expiry: Date;
  lat: number;
  lng: number;
  cart: [any];
  wishlist: [any];
  orders: [any];
}
const customerSchema = new Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String },
    salt: { type: String, required: true },
    phone: { type: String, required: true },
    verified: { type: Boolean, required: true },
    address: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "address",
      },
    ],
    // for cart
    cart: [
      {
        product: {
          _id: { type: String, required: true },
          name: { type: String },
          banner: { type: String },
          price: { type: Number },
        },
        unit: { type: String, require: true },
      },
    ],
    wishlist: [
      {
        _id: { type: String, required: true },
        name: { type: String },
        description: { type: String },
        banner: { type: String },
        available: { type: Boolean },
        price: { type: Number },
      },
    ],
    orders: [
      {
        _id: { type: String, required: true },
        amount: { type: String },
        date:{type:Date, default:Date.now()}
      },
    ],
  },
  {
    // we dont want return some important json data
    toJSON: {
      transform(doc, ret) {
        delete ret.password, delete ret.salt, delete ret.__v;
        delete ret.createdAt, delete ret.updatedAt;
      },
    },
    timestamps: true,
  }
);
const Customer = mongoose.model<CustomerDoc>("customer", customerSchema);
export { Customer };