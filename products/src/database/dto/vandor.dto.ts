// data transfer object
export interface CreateVandorInput {
 name:string,
 ownerName:string,
 foodType:[string],
 pincode:string,
 address:string,
 phone:string,
 email:string,
 password:string


}
 export interface VandorLoginInput {
    email:string,
    password:string
 }
// what the paylad we want from signature key
 export interface VandorPayload {
   _id:string
   email:string,
   name:String,
   foodTypes:[string]
}
export interface EditVandorInputs {
   address:string,
   phone:string,
   name:String,
   foodTypes:[string]
}