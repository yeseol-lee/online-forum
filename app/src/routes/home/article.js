"use strict";

const express = require("express");
const router = express.Router();
const Article = require('../../models/index.js').Article;
const User = require('../../models/index.js').User;
const Comment = require('../../models/index.js').Comment;
router.get("/", (req, res) => {
    //쿼리아이디에 article id값을 넣어서 전달
    const qID = req.query.id;
    
    //우선 댓글들을 불러온다
    Comment.findAll({
        raw: true,
        attributes: ['writer', 'text', 'created_at'],
        where: {
            article_num: `${qID}`
        },
    })
    //불러온 댓글들로 html 코드를 작성해서 넘겨준다
    .then((data) => {
        const length = data.length;
        let commentHTML = '';

        let i;
        for (i = 0; i < length; i++) {
            const writer = data[i].writer;
            const text = data[i].text;
            const created_at = data[i].created_at;
            commentHTML += '<div>';
            commentHTML += `<p>작성자: ${writer}, 작성시간:${created_at}</p>`;
            commentHTML += `<p>${text}</p>`;
            commentHTML += '</div>';
        }
        return commentHTML;
    })
    //본문 글을 불러온 다음, render하기
    .then((comments) => {
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
                update: `<a href="/article/update/?id=${qID}">수정하기</a>`,
                qID: `<input id="qID" value=${qID} type="hidden">`,
                comments: comments,
            });
            res.json(data);
        })
        .catch((err) => {
            console.error(err);
        });
    })
    .catch((err) => console.error(err));
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

//비밀번호가 일치하는지 확인
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

//비밀번호 일치 시 데이터베이스 정보 수정
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

//유저명, 비번이 일치하는지 확인
router.post("/comment1", (req, res) => {
    const username = req.body.username;
    const pwd = req.body.pwd;

    User.findOne({
        raw: true,
        attributes: ['pwd'],
        where: {
            user: `${username}`
        },
    })
    .then((data) => {
        const realPwd = data.pwd;
        if (pwd === realPwd) {
            res.json({"success": "true"});
        } else {
            res.json({"success": "false"});
        }
    })
})

router.post("/comment2", (req, res) => {
     const writer = req.body.username;
     const text = req.body.text;
     const articleNum = req.body.articleNum;

     //Comment 테이블에 댓글을 저장하자
     Comment.create({
        writer: writer,
        text: text,
        article_num: articleNum,
    })
    .then((data) => {
        res.json({"success": "true"});
    })
    .catch((err) => {
        console.error(err);
        next(err);
    });


})

module.exports = router;