"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRoutes = void 0;
// eslint-disable-next-line no-unused expressions
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("./product.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const product_validation_1 = require("./product.validation");
const router = express_1.default.Router();
router.post('/create-product', (0, validateRequest_1.default)(product_validation_1.ProductValidation.createProductZodSchema), product_controller_1.ProductController.createProduct);
router.get('/:id', product_controller_1.ProductController.getSingleProduct);
router.patch('/:id', (0, validateRequest_1.default)(product_validation_1.ProductValidation.updateProductZodSchema), product_controller_1.ProductController.updateProduct);
router.get('/', product_controller_1.ProductController.getAllProducts);
router.delete('/delete-product/:id', product_controller_1.ProductController.deleteProduct);
exports.ProductRoutes = router;
