const userModel = require("../models/userModel");
const userHistory = require("../models/userHistory");
const cryptr = require("cryptr");
const cryptrConverter = new cryptr(process.env.SECRET_KEY);
const jwt = require("jsonwebtoken");
const path = require("path");

//REACT VIEW
exports.reactView = async (req, res) => {
  res.sendFile(path.join(__dirname, "..", "/view/index.html"));
};

// register user
exports.register = async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  let {
    first_name,
    last_name,
    username,
    email,
    password,
    phone,
    gender,
    birth,
    address,
    typeUser,
  } = req.body;
  console.log(req.body);
  if (
    !first_name ||
    !last_name ||
    !username ||
    !email ||
    !password ||
    !phone ||
    !gender ||
    !birth ||
    !address ||
    !typeUser
  ) {
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
          first_name: first_name,
          last_name: last_name,
          username: username,
          email: email,
          password: newPassword,
          phone: phone,
          gender: gender,
          birth: birth,
          address: address,
          typeUser: typeUser,
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
  res.set("Access-Control-Allow-Origin", "*");
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
exports.getUserById = async (req, res) => {
  if (req.params.id) {
    let id = req.params.id;
    let findId = await userModel.findById(id);
    try {
      if (!findId) {
        res.json({
          message: "data not found",
          statusCode: 500,
        });
      } else {
        res.json(findId);
      }
    } catch (err) {
      console.log(err);
      res.json(err.message);
    }
  }
};
exports.updateUser = async (req, res) => {
  if (!req.body) {
    return res.json({
      message: " data tidak boleh kosong",
      statusCode: 400,
    });
  }
  const id = req.params.id;
  userModel
    .findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.json({
          message: `can't update user with id ${id}. maybe user not found`,
          statusCode: 404,
        });
      } else {
        res.json({
          message: "update successfully..",
          data: data,
        });
      }
    })
    .catch((err) => {
      res.json({
        message: "error to update user",
        statusCode: 500,
      });
    });
};
exports.deleteUser = async (req, res) => {
  let id = req.params.id;
  try {
    let data = await userModel.findByIdAndDelete(id);
    if (!data) {
      res.json({
        message: `can't delete user with id ${id}`,
        statusCode: 404,
      });
    } else {
      res.json({
        message: "user was deleted successfully..",
      });
    }
  } catch (err) {
    console.log(err);
    res.json(err.message);
  }
};
exports.login = async (req, res) => {
  res.set("Access-Control-Allow-Origin", "http://localhost:3000");
  let { username, password } = req.body;
  if (!username || !password) {
    res.json({
      message: "username or password wrong",
      statusCode: 400,
    });
  } else {
    try {
      let findUser = await userModel.findOne({ username: username });
      if (!findUser || findUser.length < 0) {
        res.json({
          message: "username or password wrong",
          statusCode: 400,
        });
      } else {
        let decryptPassword = cryptrConverter.decrypt(findUser.password);
        if (decryptPassword == password) {
          let token = jwt.sign(
            {
              id: findUser._id,
              username: findUser.username,
              type: findUser.typeUser,
            },
            process.env.SECRET_KEY
          );
          console.log({
            message: "success to login..",
            statusCode: 200,
            result: {
              id: findUser._id,
              username: findUser.username,
              token: token,
            },
          });
          res.cookie("token", token);
          res.json({
            message: "success to login",
            statusCode: 200,
            result: {
              data: findUser,
              token: token,
            },
          });
        }
      }
    } catch (err) {
      console.log(err);
      res.json(err.message);
    }
  }
};
exports.createHistory = async (req, res) => {
  let {user_id, username, win, draw, lose, scheme, oponent, timestamp } = req.body;
  try {
      let createHistory = await userHistory.create({
      user_id: user_id,
      username: username,
      win: win,
      draw: draw,
      lose: lose,
      scheme: scheme,
      oponent: oponent,
      timestamp: timestamp,
    });
    console.log(createHistory);
    res.json({
      message: "success to create new history",
      statusCode: 200,
      result: createHistory,
    });
  } catch (err) {
    console.log(err);
    res.json(err.message);
  }
};
exports.getHistory = async (req, res) => {
  let user_id = req.params.user_id;
  let showHistory = await userHistory.find();
  let showAll = await userHistory.find({user_id})
  try {
    if (!showHistory) {
      res.json({
        message: "data not found",
      });
    } else {
      res.json({
        message: "success to get history",
        result: showAll,
      });
    }
  } catch (err) {
    console.log(err);
    res.json(err.message);
  }
};