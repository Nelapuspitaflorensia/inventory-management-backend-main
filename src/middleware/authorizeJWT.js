const jwt = require("jsonwebtoken");

function authorizeJWT(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Tidak ada token! Gagal mengakses fitur" });
  }

  try {
    const token = req.headers.authorization.split(" ")(1);
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Pastikan ini sesuai dengan JWT_SECRET yang sama
    req.userId = decoded.userId; // Menyimpan userId untuk digunakan di middleware lain
    next();
  } catch (error) {
    console.error("Authorization error:", error.message); // Log kesalahan untuk debugging
    return res.status(403).json({ message: "Gagal mengautentikasi token" });
  }
}

module.exports = authorizeJWT;
