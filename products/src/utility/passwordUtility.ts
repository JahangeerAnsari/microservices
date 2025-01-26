import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import { SECRET_KEY } from "../config";
import { Request } from "express";
import { AuthPayload } from "../database/dto/Auth.dto";

export const generateSalt = async () => {
  return await bcrypt.genSalt();
};
export const generateHashedPassword = async (
  password: string,
  salt: string
) => {
  return await bcrypt.hash(password, salt);
};

export const validatePassword = async (
  password: string,
  exitPassword: string,
  salt: string
) => {
  return (await generateHashedPassword(password, salt)) === exitPassword;
};
// generate signature key

export const generateSignature = (payload: AuthPayload) => {
  return jsonwebtoken.sign(payload, SECRET_KEY, { expiresIn: "1d" });
};
export const validateSignature = async (req: Request) => {
   const signature = req.get("Authorization");
   if (signature) {
     try {
       const payload = jsonwebtoken.verify(
         signature.split(" ")[1],
         SECRET_KEY
       ) as AuthPayload;
       req.user = payload;
       return true;
     } catch (error:any) {

       return false;
     }
   }
   return false;
};
