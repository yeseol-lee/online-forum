"use strict";

const express = require("express");
const router = express.Router();
const User = require('../../models/index.js').User;


router.get("/", (req, res) => {
    res.render("register.ejs");
})

//데이터베이스 내용 출력
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

//받아옴
router.post("/process", (req, res) => {
    User.create({
        user: req.body.username,
        pwd: req.body.pwd,
    })

});

module.exports = router;