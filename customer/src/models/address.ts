import mongoose , {Document, Schema, } from 'mongoose';

interface AddressDoc extends Document{
    street: string;
    postalCode: string;
    city: string;
    country:string
    
    
 
}
const addressSchema = new Schema(
  {
    street: { type: String},
    postalCode: { type: String },
    city: { type: String},
    country: { type: String },

  },
  {
    // we dont want return some important json data
    
    timestamps: true,
  }
);
const Address = mongoose.model<AddressDoc>("address", addressSchema);
export { Address };