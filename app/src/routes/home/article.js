"use strict";

const express = require("express");
const router = express.Router();
const Article = require('../../models/index.js').Article;
const User = require('../../models/index.js').User;

router.get("/", (req, res) => {
    console.log("got /article");
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
            text: db.text,
            update: `<a href="/article/update/?id=${qID}">수정하기</a>`
        });
        res.json(data);
    })
    .catch((err) => {
        console.error(err);
    });
    
});

router.get("/update", (req, res) => {
    console.log("got /article/update");
    const qID = req.query.id;

    //id값을 바탕으로 데이터베이스에서 글 조회
    Article.findOne({
        raw: true,
        attributes: ['title', 'text'],
        where: {
            id: `${qID}`
        },
    })
    .then((data) => {
        const title = data.title;
        const article = data.text;

        console.log(article);
        //수정 전 내용 넣어서 render하기
        res.render("update.ejs", {
            input: `<input id="title" type="text" value=${title} placeholder="글 제목을 입력하세요">`,
            textarea: `<textarea id="article" cols="30" rows="10" placeholder="본문을 입력하세요">
            ${article}</textarea>`,
            qID: `<input id="qID" value=${qID} type="hidden">`
        });

    })
    .catch((err) => console.error(err));

})

router.post("/update1", (req, res) => {
    const pwd = req.body.pwd;
    const qID = req.body.qID;
    
    //우선 qID로 aticles 테이블에서 writer을 찾음
    Article.findOne({
        raw: true,
        attributes: ['writer'],
        where: {
            id: `${qID}`
        },
    })
    .then((data) => {
        const writer = data.writer;

        //uesr 테이블에서 writer과 pwd가 일치하는지 확인
        User.findOne({
            raw: true,
            attributes: ['pwd'],
            where: {
                user: `${writer}`
            },
        })
        .then((data) => {
            const realPwd = data.pwd;
            //패스워드 일치 시 프론트로 성공 메시지 보내기
            if (pwd === realPwd) {
                res.json({"success": "true"});
                console.log("성공");
            //실패 시 실패 메시지 보냄
            } else {
                res.json({"success": "false"});
                console.log("실패");
            }
        })

    })
    .catch((err) => console.error(err));
    
})

router.post("/update2", (req, res) => {
    const qID = req.body.qID;
    const title = req.body.title;
    const article = req.body.article;

    console.log(title);
    console.log(qID, title, article);
    //Article 테이블에 qID를 바탕으로 데이터 수정
    Article.update({
        title: `${title}`,
        text: `${article}`,
    }, { where: { id: parseInt(`${qID}`)}}
    )
    .then((data) => {
        res.json({"success": "true"});
    })
    .catch((err) => console.error(err));
})
module.exports = router;