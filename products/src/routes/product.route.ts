import express from 'express'
import { productController } from '../controller';

const router = express.Router();
router.post('/add-product',productController.createProduct)
export { router as productRoute };
