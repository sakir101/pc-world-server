// eslint-disable-next-line no-unused expressions
import express from 'express'
import { ProductController } from './product.controller'
import validateRequest from '../../middlewares/validateRequest'
import { ProductValidation } from './product.validation'



const router = express.Router()

router.post('/create-product',
    validateRequest(ProductValidation.createProductZodSchema),
    ProductController.createProduct)

router.get('/:id', ProductController.getSingleProduct)

router.patch('/:id', validateRequest
    (ProductValidation.updateProductZodSchema), ProductController.updateProduct)

router.get('/', ProductController.getAllProducts)

router.delete('/delete-product/:id', ProductController.deleteProduct)

export const ProductRoutes = router