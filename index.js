const express = require("express");
const app = express();
const dotenv = require("dotenv");
const morgan = require("morgan");
const path = require("path");
const socketio = require("socket.io");
const cors = require("cors");
const connectDB = require("./config/connectDB");
const cookieParser = require("cookie-parser");
const bodyparser = require("body-parser");
const swaggerJSON = require("./game-openapi.json");
const swaggerUI = require("swagger-ui-express");

//routing to api documentation
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerJSON));

app.use(express.static(path.join(__dirname, "/view")));

//middleware
dotenv.config({ path: "./config/config.env" });
const PORT = process.env.PORT || 7000;
app.use(morgan("dev"));
connectDB();

// app.use(cors()); // agar API dapat diakses dari luar
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/", require("./routes/router"));

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
