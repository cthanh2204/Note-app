const Users = require("../models/usersModel");
const generateToken = require("../config/generateToken");
const bcrypt = require("bcrypt");
const authControllers = {
  register: async (req, res) => {
    try {
      const { fullName, email, password } = req.body;
      if (!fullName) {
        return res.status(400).json({ message: "Full name is required" });
      }
      if (!email) {
        return res.status(400).json({ message: "Email is required" });
      }
      if (!password) {
        return res.status(400).json({ message: "Password is required" });
      }

      const isUser = await Users.findOne({ email });
      if (isUser) {
        return res.status(400).json({ message: "User already exist" });
      }

      //hashPassword
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hashSync(password, salt);

      const user = await Users.create({
        fullName,
        email,
        password: hashPassword,
      });
      const accessToken = generateToken(user);
      return res.status(200).json({
        user,
        accessToken,
      });
    } catch (error) {
      res.status(400).json(error);
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json("Fill all the field ");
      }

      const userInfo = await Users.findOne({ email });
      if (!userInfo) {
        return res.status(400).json({ message: "User not found" });
      }

      const checkPassword = await bcrypt.compare(password, userInfo.password);
      if (!checkPassword) {
        return res.status(400).json({ message: "Password is incorrect" });
      }

      const accessToken = generateToken(userInfo);

      if (userInfo.email === email && checkPassword) {
        return res.status(200).json({
          user: userInfo,
          accessToken,
        });
      }
    } catch (error) {
      return res.status(400).json(error);
    }
  },

  getUser: async (req, res) => {
    const user = req.user;
    const isUser = await Users.findOne({ _id: user._id }).select("-password");
    if (!isUser) return re.status(500).json("User not found");
    return res.status(200).json({
      user: isUser,
    });
  },
};

module.exports = authControllers;
