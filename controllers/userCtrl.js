const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
require("dotenv").config();

exports.register = async (req, res) => {
//   console.log("register body", req.body);

  try {
    const { email, password } = req.body;

    const users = await userModel.getUsers();

    if (users.find((user) => user.email === email)) {
      return res.status(400).json({ error: "email has already been taken." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    let id = 1;

    if (users.length > 0) {
      const ids = users.map((i) => Number(i.id));
      id = Math.max(...ids) + 1;
    }

    users.push({
      id,
      email,
      password: hashedPassword,
    });
    await userModel.addUsers(users);
    res.status(201).json({ message: "User register successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
    console.error(error);
  }
};

exports.login = async (req, res) => {
//   console.log("body", req.body);
  try {
    const { email, password } = req.body;
    const users = await userModel.getUsers();

    const user = users.find((user) => user.email === email);

    if (!user) {
      return res
        .status(400)
        .json({ error: "User not found! Please Create a account" });
    }

    const passwordIsMatch = await bcrypt.compare(password, user.password);
    if (!passwordIsMatch) {
      return res.status(400).json({ error: "Invalid password." });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.status(200).json({message:"User login successfully", token });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
    console.error(error);
  }
};
