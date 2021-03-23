"use strict";

const express = require("express");
const app = express();
const bodyParser = require("body-parser");

//시퀄라이즈로 DB연결
const sequelize = require('./src/models').sequelize;
sequelize.sync();

//앱 세팅
app.set("views", "./src/views");
app.engine('html', require('ejs').renderFile);
app.set("view engine", "html");

//라우팅
const indexRouter = require("./src/routes/home");
const registerRouter = require("./src/routes/home/register");
const articleRouter = require("./src/routes/home/article");

//정적 경로 추가
app.use(express.static(`${__dirname}/src/public`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//미들웨어
app.use("/", indexRouter);
app.use("/register", registerRouter);
app.use("/article", articleRouter);

module.exports = app;
 