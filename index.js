/** @format */
const fs = require("fs");
const path = require("path");

const express = require("express");
const expressLayout = require("express-ejs-layouts");
const ejs = require("ejs");
const morgan = require("morgan");
const fileUpload = require("express-fileupload");

const dotenv = require("dotenv");
dotenv.config();

const cookieParser = require("cookie-parser");
const session = require("express-session");
const mongoStore = require("connect-mongo");
const connectDB = require("./Config/db.js");

const Product = require("./Server/Models/product.js");
const Orders = require("./Server/Models/order.js");
const ads = require("./Server/Models/ads.js");

//const authMiddleware = require("./Server/Utils/auth");

const app = express();
const PORT = process.env.PORT;
app.listen(PORT, err => {
    if (!err) {
        console.log(
            `app listening on port ${PORT}, at ${process.env.ADDRESS}${PORT}`
        );
        connectDB();
    }
});

app.use(morgan("tiny"));

app.use(cookieParser());
app.use(fileUpload());
app.use(
    session({
        store: mongoStore.create({
            mongoUrl: process.env.MONGO_URI
        }),
        secret: process.env.SECRET_KEY,
        saveUninitialized: false,
        resave: false,
        cookies: {
            maxAge: 360000,
            secure: true,
            httpOnly: true
        }
    })
);

//SETUP VIEW ENGINE
app.set("view engine", "ejs");
app.set("views", "Views");

//LOAD STATIC FILES
app.use(express.static("PUBLIC"));

//req.body PARSER TO JSOM
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//SET LAYOUT
app.use(expressLayout);
app.set("layout", "Layouts/mainLayout");

app.post("/", async (req, res) => {
    try {
        let data = await Product.insertMany(allProducts);

        console.log(`${data.length} products uploaded successfully`);
        return res.json({ data });
    } catch (error) {
        console.error(error);
    }
});

//SECONDARY ROUTING
app.use("/admin", require("./Server/Routes/adminRoutes"));
app.use("/auth", require("./Server/Routes/authRoutes"));
app.use("/", require("./Server/Routes/customerRoutes"));
