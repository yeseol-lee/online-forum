"use strict";

const express = require("express");
const router = express.Router();
const Article = require('../../models/index.js').Article;
const change = require("./function.js");


router.get("/", (req, res) => {
    let page = req.query.page;
    
    //우선 페이지수를 계산함
    Article.findAll({
        raw: true,
        attributes: ['id'],
    })
    .then((data) => { 
        const dataLength = data.length;
        let offset;
        let limit = 10;
        
        //page값을 가지고있지 않는 경우는 1로 친다
        if (!page) page = '1';
        
        offset = dataLength - 10 * parseInt(page);
        renderList(dataLength, limit, offset, res);

        //가장 마지막페이지 => 글 개수가 10보다 작을 수 있다
        if (offset < 0) {
            limit = offset + 10;
            offset = 0;
            renderList(dataLength, limit, offset, res);
        }
        
    })
    .catch((err) => console.error(err));
    
})    


//홈 화면으로 들어오면, database에서 글 목록을 가져와서 보내줌
function renderList(dataLength, limit, offset, res) {
    Article.findAll({
        raw: true,
        attributes: ['id', 'writer', 'created_at', 'title'],
        limit: parseInt(`${limit}`),
        offset: parseInt(`${offset}`),
    })
    .then((data) => {
        res.render("index.ejs", { 
            tr: getTr(data),
            number: getLink(dataLength),
            });
    })
    .catch((err) => {
        console.error(err);
    })
}
    


//최근 작성된 글 정보가 앞부분에 옴
function getTr(data) {
    let tr = '';
    let i;
    for (i = data.length-1; i >= 0; i--) {
        const id = data[i].id;
        const writer = data[i].writer;
        const title = data[i].title;
        const createdAt = change.dateForMain(data[i].created_at);

        tr += `<tr><td>${id}</td>
        <td><a href="/article/?id=${id}">${title}</a></td>
        <td>${writer}</td><td>${createdAt}</td></tr>`;
    }
    return tr;
}

//글 수를 받아와서 다음페이지로 가는 링크를 만든다
function getLink(dataLength) {
    //만들어야하는 링크 수 계산
    let pageNum = 0;
    let articleNum = dataLength;
    while (articleNum > 0) {
        articleNum -= 10;
        pageNum++;
    }

    let i;
    let linkHTML = '';
    for (i = 1; i <= pageNum; i++) {
        linkHTML += `<a href="/?page=${i}"> ${i} </a>`;
    }
    return linkHTML;
}

module.exports = router;