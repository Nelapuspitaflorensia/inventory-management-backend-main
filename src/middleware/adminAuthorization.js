const jwt = require("jsonwebtoken");

const adminAuthorization = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Mengambil token Bearer
  if (!token) {
    return res.status(401).json({ message: "Token not provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "ADMIN") {
      return res.status(403).json({ message: "Access forbidden" });
    }
    req.userId = decoded.userId; // Menyimpan data user jika dibutuhkan
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = adminAuthorization;
