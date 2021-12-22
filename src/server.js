const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');
const fileUpload = require("express-fileupload");

const db = require("./config/db");
const productRoutes = require("./routings/product");
const userRoutes = require("./routings/user");
const orderRoutes = require("./routings/order");
const uploadRoutes = require("./routings/upload");

const production = process.env.NODE_ENV === "production";

require("dotenv").config();

const app = express();

production && app.use(express.static(path.join(__dirname, "../client/build")));

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
// app.use(fileUpload());

// database connection
db.makeDb();


app.use("/products", productRoutes);
app.use("/user", userRoutes);
app.use("/order", orderRoutes);
app.use("/upload", uploadRoutes);

// when we ready to get our payment we will hit this route and fetch this client ID
app.get("/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

const __zirname = path.resolve();
app.use("/uploads", express.static(path.join(__zirname, "/uploads")));

app.get("/", (req, res) => {
  res.send("API running")
})

production && (
  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build", "index.html"));
  })
)

app.listen(process.env.PORT || 4000, console.log('Server is Running'));
