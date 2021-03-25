"use strict";

const dateForMain = (obj) => {
    let string = '';

    const month = obj.getMonth() + 1;
    const date = obj.getDate();
    const hour = obj.getHours();
    const min = obj.getMinutes();

    string += `${month}월 ${date}일 ${hour}시 ${min}분`;

    return string;
}

const dateForArticle = (obj) => {
    let string = '';

    const year = obj.getFullYear();
    const month = obj.getMonth() + 1;
    const date = obj.getDate();
    const hour = obj.getHours();
    const min = obj.getMinutes();
    const sec = obj.getSeconds();

    string += `${year}.${month}.${date} ${hour}:${min}:${sec}`;

    return string;
    
}

module.exports = { dateForMain, dateForArticle};
