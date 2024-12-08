const express = require("express");
const cors = require("cors"); // Import cors
const app = express();
const dotenv = require("dotenv");
const adminAuthorization = require("./middleware/adminAuthorization");
dotenv.config();

// Daftar asal (origin) yang diizinkan
const allowedOrigins = [
  "https://inventory-management-frontend-main.vercel.app",
  "https://inventory-management-frontend-main-axon970al.vercel.app",
  "https://inventory-management-frontend-main-qaqa27xms.vercel.app/",
];

// Konfigurasi CORS
const corsOptions = {
  origin: (origin, callback) => {
    // Periksa apakah origin termasuk dalam daftar yang diizinkan
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true); // Izinkan akses
    } else {
      callback(new Error("Not allowed by CORS")); // Tolak akses
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"], // Metode yang diizinkan
  allowedHeaders: ["Content-Type", "Authorization"], // Header yang diizinkan
};

app.use(cors(corsOptions)); // Menggunakan CORS di seluruh aplikasi

app.use(express.json()); // Middleware untuk parsing JSON

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
app.options("*", cors(corsOptions)); // Pastikan preflight menggunakan konfigurasi yang sama

module.exports = app;
