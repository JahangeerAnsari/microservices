import { CustomerPayload } from "./product.dto";
import { VandorPayload } from "./vandor.dto";

export type AuthPayload = CustomerPayload | VandorPayload;
