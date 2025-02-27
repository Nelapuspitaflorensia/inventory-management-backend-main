const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const userRepository = require("./auth.repository");

function generateToken(user) {
  return jwt.sign(
    {
      userId: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
}

async function register(username, email, password) {
  try {
    const hashedPassword = await bcryptjs.hash(password, 10);
    const user = { username, email, password: hashedPassword, role: "USER" };
    const newUser = await userRepository.createUser(user);
    return newUser;
  } catch (error) {
    throw new Error(error.message || "Failed to register user");
  }
}

async function login(username, password) {
  const user = await userRepository.findUserByUsername(username);

  if (!user) {
    throw new Error("Invalid Username Or Password");
  }

  const isValidPassword = await bcryptjs.compare(password, user.password);

  if (!isValidPassword) {
    throw new Error("Invalid Username Or Password");
  }

  const token = generateToken(user);
  return { user, token };
}

module.exports = { register, login };
