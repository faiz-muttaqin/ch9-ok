const express = require("express");
const route = express.Router();
const userController = require("../controllers/userController");

// route.get("/", (req, res) => {
//   res.send("Akses /api-docs untuk cek API yang tersedia");
// });

//userView
route.get("/", userController.reactView);
route.get("/signup", userController.reactView);
route.get("/login", userController.reactView);
route.get("/room", userController.reactView);
route.get("/room/game", userController.reactView);
route.get("/user-profile", userController.reactView);
route.get("/admin", userController.reactView);
route.get("/user-edit/:id", userController.reactView);

// API User
route.post("/api/user", userController.register); // create new user
route.get("/api/user", userController.getUser); // get all user
route.get("/api/user/:id", userController.getUserById); //get User by Id
route.put("/api/user/:id", userController.updateUser); //Update User by Id
route.delete("/api/user/:id", userController.deleteUser); // delete User by Id

route.post("/api/login", userController.login); // Post user data & Verify

route.post("/api/history", userController.createHistory); // Create gameplay history
route.get("/api/history/:user_id", userController.getHistory); // get user gameplay history by id

module.exports = route;
