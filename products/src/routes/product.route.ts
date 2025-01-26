import express from 'express'
import { productController } from '../controller';
import { Authenticate } from '../middlewares';

const router = express.Router();
router.use(Authenticate);
router.post('/add-product', productController.createProduct);
router.get('/products', productController.findProducts);
router.get('/:category', productController.productByCategory);
router.get('/wishlist', productController.addProductToWishlist);
router.delete('/wishlist/:id', productController.removeFromToWishlist);
router.delete('/cart', productController.addProductToCart);
router.delete('/cart/:id', productController.removeProductFromCart);
router.get('/:id', productController.productById);

export { router as productRoute };
