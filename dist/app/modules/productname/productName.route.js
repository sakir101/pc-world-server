"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductNameRoutes = void 0;
// eslint-disable-next-line no-unused expressions
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("../product/product.controller");
const router = express_1.default.Router();
router.get('/:category', product_controller_1.ProductController.getSingleProductByName);
exports.ProductNameRoutes = router;
