import { VandorPayload } from './vandor.dto';
import {CustomerPayload} from './customer.dto'
export type AuthPayload = CustomerPayload | VandorPayload;