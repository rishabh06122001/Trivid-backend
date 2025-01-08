const mongoose = require("mongoose");
const User = require("../Models/User");
const Pandit = require("../Models/Pandit");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
exports.signup = async (req, res) => {
  try {
    const { name, email, password, phone, role } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    let hashedPassword;

    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Hashing Error",
      });
    }

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      role,
    });

    return res.status(200).json({
      success: true,
      message: "User created Successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Error while registration",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all the details carefully",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User doesn't exist",
      });
    }

    const payload = {
      email: user.email,
      id: user._id,
      role: user.role,
    };

    if (await bcrypt.compare(password, user.password)) {
      //    generate token
      let token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });
      let userObj = user.toObject();
      userObj.token = token;
      userObj.password = undefined;

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 1000),
        httpOnly: true,
        sameSite: 'None',
        secure:true,
      };

      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user: userObj,
        message: "User LoggedIn Successfully",
      });
    } else {
      return res.status(403).json({
        success: false,
        message: "Incorrect Password",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Login Failure",
    });
  }
};

exports.getPandits = async (req, res) => {
  try {
    const pandits = await Pandit.find();
    res.status(200).json({
      success: true,
      message: "Pandits Fetched Successfully",
      data: pandits,
    });
  } catch (err) {
    console.error("Error retrieving pandits:", err);

    res.status(500).json({
      success: false,
      message: "Failed to retrieve pandits",
      error: err.message,
    });
  }
};
