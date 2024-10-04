"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_route_1 = require("../modules/auth/auth.route");
const product_route_1 = require("../modules/product/product.route");
const category_route_1 = require("../modules/category/category.route");
const productName_route_1 = require("../modules/productname/productName.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/products',
        route: product_route_1.ProductRoutes
    },
    {
        path: '/categories',
        route: category_route_1.CategoryRoutes
    },
    {
        path: '/productName',
        route: productName_route_1.ProductNameRoutes
    },
    {
        path: '/auth',
        route: auth_route_1.AuthRoutes
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
