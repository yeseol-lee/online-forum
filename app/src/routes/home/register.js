"use strict";

const express = require("express");
const router = express.Router();
const User = require('../../models/index.js').User;


router.get("/", (req, res) => {
    res.render("register.ejs");
})

router.get("/process" , (req, res) => {
    User.findAll({raw: true})
        .then((users) => {
            console.log(users);
            console.log("쿠구구구구국구ㅜㄱㅇ");
        })
        .catch((err) => {
            console.error(err);
            next(err);
        });
        res.send("hello");
});

module.exports = router;