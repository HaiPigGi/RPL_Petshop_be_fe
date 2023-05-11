import express from 'express';
import { getUsers,Register,Login } from '../controller/userController.js';
import { verifyTok } from '../middleware/verify.js';
import { Logout } from '../controller/userController.js';
import { getProduct,createProduct,updateProduct,deleteProduct,getProductById } from '../controller/ProductController.js';
import { processPayment } from '../controller/PaymentController.js';
import stripe from 'stripe';

const stripeAPI = stripe("sk_test_51N5V5GK1ezlSiaycWDcfoNb0UmqRyTjkr6XbqnoHdo3ipueWbutszvEkCovvzPMqsMoDPlujLuvjTHXQcqhNtxXR00oDRquGuT");


//require("dotenv").config();


const router =express.Router();

router.get('/users',getUsers);
router.post('/users',Register);
router.post('/login',Login);
router.get("/token",verifyTok);
router.delete('/logout', Logout);

router.get("/product",getProduct);
router.get('/product/:id', getProductById);
router.post('/product', createProduct);
router.patch('/product/:id', updateProduct);
router.delete('/product/:id', deleteProduct);


//Router Gateway for Stripe API Payment
router.post('/payment', processPayment);

export default router;