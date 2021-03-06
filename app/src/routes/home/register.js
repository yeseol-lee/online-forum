"use strict";

const express = require("express");
const router = express.Router();
const User = require('../../models/index.js').User;


router.get("/", (req, res) => {
    res.render("register.ejs");
})

//받아옴
router.post("/process", (req, res) => {
    const username = req.body.username;
    //이미 존재하는 username인지 확인해서 응답 보내기
    User.findAll({
        raw: true,
        attributes: ['user'],
        where: {
            user: `${username}`
        },
    })
    .then((user) => {
        if(user.length === 1) {
            const response = {"success": "false"};
            return res.json(response);
        } else {
            User.create({
                user: req.body.username,
                pwd: req.body.pwd,
            })
            const response = {"success": "true"};
            return res.json(response);
        }
    })
    .catch((err) => {
        console.error(err);
    });

    
    

});

module.exports = router;