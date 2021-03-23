"use strict";

const express = require("express");
const router = express.Router();
const Article = require('../../models/index.js').Article;



router.get("/", (req, res) => {
    //홈 화면으로 들어오면, database에서 글 목록을 가져와서 보내줌
    Article.findAll({
        raw: true,
        attributes: ['id', 'writer', 'created_at', 'title'],
    })
    .then((data) => {
        console.log(data.length);
        res.render("index.ejs", { tr: getTr(data) });
    })
    
    
})

//최근 작성된 글 정보가 앞부분에 옴
function getTr(data) {
    let tr = '';
    let i;
    for (i = data.length-1; i >= 0; i--) {
        const id = data[i].id;
        const writer = data[i].writer;
        const title = data[i].title;
        const createdAt = data[i].created_at;
        tr += `<tr><td>${id}</td><td>${title}</td><td>${writer}</td><td>${createdAt}</td></tr>`;
    }
    return tr;
}

module.exports = router;