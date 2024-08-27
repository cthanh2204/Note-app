const jwt = require("jsonwebtoken");

const authorizeToken = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = decoded.user;
      next();
    } catch (error) {
      return res.status(400).json({ message: "Token is not verify" });
    }
  }
};

module.exports = authorizeToken;
