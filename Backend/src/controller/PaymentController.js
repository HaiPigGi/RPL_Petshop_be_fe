import Product from "../models/product.js";
import stripe from "stripe";

// Inisialisasi Stripe dengan API Key
export const stripeAPI = stripe("sk_test_51N5V5GK1ezlSiaycWDcfoNb0UmqRyTjkr6XbqnoHdo3ipueWbutszvEkCovvzPMqsMoDPlujLuvjTHXQcqhNtxXR00oDRquGuT");

export const processPayment = async (req, res) => {
  try {
    const { productId } = req.body;

    // Temukan produk berdasarkan id
    const product = await Product.findOne({
      where: {
        id: productId,
      },
    });

    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    const { name, harga } = product;

    // Proses pembayaran menggunakan Stripe
    const paymentIntent = await stripeAPI.paymentIntents.create({
      amount: harga * 100, // Harga dalam satuan sen (misal: $10.50 menjadi 1050)
      currency: "usd", // Mata uang
      description: name, // Deskripsi pembayaran
    });

    // Mengembalikan pesan pembayaran berhasil dan detail produk
    return res.status(200).json({
      msg: "Payment processed successfully",
      product: {
        name,
        harga,
      },
      clientSecret: paymentIntent.client_secret, // Mengirimkan client secret ke frontend untuk mengonfirmasi pembayaran
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: "Server Error" });
  }
};
