const userModel = require("../models/userModel");
const userProfileModel = require("../models/userProfileModel");
const userHistory = require("../models/userHistory");
const cryptr = require("cryptr");
const cryptrConverter = new cryptr(process.env.SECRET_KEY);
const jwt = require("jsonwebtoken");

// register user
exports.register = async (req, res) => {
  let { username, email, password } = req.body;
  console.log(req.body);
  if (!username || email || password) {
    res.status(400).send({
      message: "kesalahan data",
      statusCode: 400,
    });
  } else {
    try {
      //check data from database
      let userCheck = await userModel.findOne({
        username: username,
        email: email,
      });
      if (userCheck) {
        res.send(400).send({
          message: "username or email has registered",
        });
      } else {
        // encryp password
        let newPassword = cryptrConverter.encrypt(password);
        let createUser = await userModel.create({
          username: username,
          email: email,
          password: newPassword,
        });
        // create profile
        let createProfile = await userProfileModel.create({
          user_id: createUser._id,
          username: createUser.username,
          firstName: "",
          lastName: "",
          umur: 0,
          tglLahir: "",
          gender: "",
          address: "",
        });
      }
      console.log({
        message: "success to create user",
        statusCode: 200,
      });
      res.json({
        message: "success to create user",
        statusCode: 200,
      });
    } catch (err) {
      console.log(err);
      res.send(err.message);
    }
  }
};
// get user
exports.getUser = async (req, res) => {
  if (req.query.id) {
    const id = req.query.id;
    let findId = await userModel.findById(id);
    try {
      if (!findId) {
        res.status(400).send({ message: "data not found" });
      } else {
        res.send(findId);
      }
    } catch (err) {
      console.log(err);
    }
  } else {
    try {
      let findUser = await userModel.find();
      res.json(findUser);
    } catch (err) {
      console.log(err);
      res.json(err.message);
    }
  }
};

exports.getUserById = async (req, res) => {};
exports.updateUser = async (req, res) => {};
exports.deleteUser = async (req, res) => {};
exports.login = async (req, res) => {};
exports.createHistory = async (req, res) => {};
exports.getHistory = async (req, res) => {};
