"use strict";

const express = require("express");
const router = express.Router();
const Article = require('../../models/index.js').Article;

router.get("/", (req, res) => {
    //쿼리아이디에 article id값을 넣어서 전달
    const qID = req.query.id;
    console.log(qID);
    Article.findAll({
        raw: true,
        where: {
            id: `${qID}`
        },
    })
    .then((data) => {
        const db = data[0];
        res.render("article.ejs", {
            title: db.title,
            writer: db.writer,
            created_at: db.created_at,
            text: db.text
        });
        res.json(data);
    })
    .catch((err) => {
        console.error(err);
    });
    
});

module.exports = router;