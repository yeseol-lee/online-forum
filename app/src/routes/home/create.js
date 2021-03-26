"use strict";

const express = require("express");
const router = express.Router();
const User = require('../../models/index.js').User;
const Article = require('../../models/index.js').Article;

router.get("/", (req, res) => {
    res.render("create.ejs");
})

//유저네임  패스워드 검사
router.post("/process1", (req, res) => {
    const username = req.body.username;
    const pwd = req.body.pwd;
    User.findAll({
        raw: true,
        attributes: ['pwd'],
        where: {
            user: `${username}`
        },
    })
    .then((users) => {
        if (users.length === 0) {
            return res.json({"state": "no-user"});
        } else {
            const realPwd = users[0].pwd;
            if (pwd !== realPwd) {
                return res.json({"state": "password-error"});
            } else {
                return res.json({"state": "success"});
            }
        }
    })
    .catch((err) => {
        console.error(err);
        next(err);
    });
})

//글 작성 프로세스
router.post("/process2", (req, res) => {
    const title = req.body.title;
    const article = req.body.article;
    const username = req.body.username;
    
    Article.create({
        writer: username,
        title: title,
        text: article,
    })
    .catch((err) => {
        console.error(err);
        next(err);
    });
})
module.exports = router;