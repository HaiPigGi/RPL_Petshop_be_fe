import express from 'express';
import dotenv from "dotenv";
import db from "../Backend/src/config/database.js";
import FileUpload from "express-fileupload";
import Users from './src/models/usersModel.js';
import ruter from './src/routes/index.js';
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from 'body-parser';
import router from './src/routes/index.js';
dotenv.config();
import Product from './src/models/product.js';

const app = express();
try {
    await db.authenticate();
    console.log("Database Connected");
    Product.sync();
} catch (err) {
    console.log(err);
}

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });
  


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ruter);

app.use(express.static("public"));
app.use(FileUpload());
// Menyajikan folder public/images sebagai file statis
app.use(cors({ credentials:true, origin:'http://localhost:3000' }));
app.use(cookieParser());
app.use(express.json());
app.use(router);
app.listen(5000, () => console.log('Server berjalan di http://localhost:5000'));
