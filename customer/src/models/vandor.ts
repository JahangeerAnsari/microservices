import mongoose , {Document, Schema, } from 'mongoose';
interface VandorDoc extends Document{
    name:String,
 ownerName:String,
 foodType:[string],
 pincode:string,
 address:string,
 phone:string,
 email:string,
 password:string,
 salt:string,
 serviceAvailable:boolean,
 coverImages:[string],
 rating:number,
 foods:any
}
const vandorSchema = new Schema({
    name:{type:String,required:true},
    ownerName:{type:String,required:true},
    foodType:{type:[String]},
    pincode:{type:String, required:true},
    address:{type:String,required:true},
    phone:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    salt:{type:String,required:true},
    serviceAvailable:{type: Boolean,required:true},
    coverImages:{type:[String]},
    rating:{type:Number},
   

    foods:[{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'food'
    }]
},{
    // we dont want return some important json data
    toJSON:{
        transform(doc,ret){
            delete ret.password,
            delete ret.salt,
            delete ret.__v
            delete ret.createdAt,
            delete ret.updatedAt

        }
    },
    timestamps:true
})
const Vandor = mongoose.model<VandorDoc>('vandor',vandorSchema);
export {Vandor}