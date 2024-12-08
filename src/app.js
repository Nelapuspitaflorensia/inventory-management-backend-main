const express = require("express");
const cors = require("cors"); // Import cors
const app = express();
const dotenv = require("dotenv");
const adminAuthorization = require("./middleware/adminAuthorization");
dotenv.config();

// Mengaktifkan CORS agar frontend dapat mengakses backend
const corsOptions = {
  origin: "https://inventory-management-frontend-main-qaqa27xms.vercel.app", // URL frontend Anda
  methods: ["GET", "POST", "PUT", "DELETE"], // Metode yang diizinkan
  allowedHeaders: ["Content-Type", "Authorization"], // Header yang diizinkan
};

app.use(cors(corsOptions)); // Menggunakan CORS di seluruh aplikasi

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello There!");
});

// Mengimpor controller
const authController = require("./auth/auth.controller");
const itemController = require("./item/item.controller");
const userController = require("./user/user.controller");
const transactionController = require("./transaction/transaction.controller");

// Rute API
app.use("/api/auth", authController);
app.use("/api/items", itemController);
app.use("/api/users", adminAuthorization, userController); // Hanya akses admin yang membutuhkan middleware
app.use("/api/transactions", transactionController);

// Menangani preflight request (OPTIONS) untuk CORS
app.options("*", (req, res) => {
  res.header(
    "Access-Control-Allow-Origin",
    "https://inventory-management-frontend-main-qaqa27xms.vercel.app"
  );
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.send();
});

module.exports = app;
