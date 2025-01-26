import mongoose, { Schema } from "mongoose";
interface ProductDoc extends Document{
    name: string;
    desc: string
    banner: string;
    type: string;
    unit: number;
    price: number;
    available: boolean;
    suplier:string
    
}

const productSchema = new Schema(
  {
    name: { type: String },
    desc: { type: String },
    banner: { type: String },
    type: { type: String },
    unit: { type: Number },
    price: { type: Number },
    available: { type: Boolean },
    suplier: { type: String },
  },

  {
    toJSON: {
      transform(doc, ret) {
         delete ret.__v;
      },
    },
    timestamps: true,
  }
);
const Product = mongoose.model<ProductDoc>("product", productSchema);
export { Product };