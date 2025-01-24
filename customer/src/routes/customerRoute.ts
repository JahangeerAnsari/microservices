import express from "express";

import { Authenticate } from "../middlewares";
import { customerController } from "../controllers";
const router = express.Router();
/* Signup as customer / create new account*/
router.post("/signup",customerController.customerSignup);
/* Login as customer */
router.post("/signin", customerController.customerSignIn);
 // //To verify customer we have first authenticate
router.use(Authenticate);
 router.post("/address",customerController.customerAddress);
 router.get("/address",customerController.customerById);
 router.get("/wishlist", customerController.myWishList);
 router.post("/wishlist", customerController.addProductToWishlist);

 export { router as customerRoute };
