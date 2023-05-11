import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const PaymentPage = () => {
  const [name, setName] = useState("");
  const [jenis, setJenis] = useState("");
  const [harga, setHarga] = useState("");
  const [file, setFile] = useState("");
  const [preview, setPreview] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const { id } = useParams();

  useEffect(() => {
    getUserById();
  }, []);

  const handlePayment = async () => {
    try {
      const response = await axios.post("http://localhost:5000/payment", { productId: id });
      const { msg, product, clientSecret } = response.data;

      if (msg === "Payment processed successfully") {
        setPaymentStatus("success");
        setProductName(product.name);
        setProductPrice(product.harga);

        // Set up Stripe Elements and confirm payment
        // ...
      }
    } catch (error) {
      console.log(error.response.data);
      setPaymentStatus("error");
    }
  };

  const getUserById = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/product/${id}`);
      const { name, jenis, harga, file } = response.data;
      setName(name);
      setJenis(jenis);
      setHarga(harga);
      setFile(file);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div>
      <h2>Payment Page</h2>
      <form>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="jenis">Jenis:</label>
          <input
            type="text"
            id="jenis"
            value={jenis}
            onChange={(e) => setJenis(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="harga">Harga:</label>
          <input
            type="text"
            id="harga"
            value={harga}
            onChange={(e) => setHarga(e.target.value)}
          />
        </div>
        
        <button type="button" onClick={handlePayment}>
          Process Payment
        </button>
      </form>
      {paymentStatus === "success" && (
        <div>
          <h3>Payment Successful</h3>
          <p>Product Name: {productName}</p>
          <p>Product Price: {productPrice}</p>
        </div>
      )}
      {paymentStatus === "error" && (
        <div>
          <h3>Payment Failed</h3>
          <p>Sorry, an error occurred during payment.</p>
        </div>
      )}
    </div>
  );
};

export default PaymentPage;
