const express = require("express");
const route = express.Router();
const userController = require("../controllers/userController");

route.get("/", (req, res) => {
  res.send("Ini Contoh Aplikasi akses /api-docs (sedang dalam tahap Build)");
});
// API User
route.post("/api/user", userController.register); // create new user
route.get("/api/user", userController.getUser); // get all user
route.get("/api/user/:id", userController.getUser); //get User by Id
route.put("/api/user/:id", userController.updateUser); //Update User by Id
route.delete("/api/user/:id", userController.deleteUser); // delete User by Id

route.post("/api/login", userController.login); // Post user data & Verify

route.post("/api/history", userController.createHistory); // Create gameplay history
route.get("/api/history/:id", userController.getHistory); // get user gameplay history by id

module.exports = route;
