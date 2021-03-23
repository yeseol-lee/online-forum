"use strict";

document.getElementById('create-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const pwd = event.target.pwd.value;
    const title = event.target.title.value;
    const article = event.target.article.value;

    //default 방지
    if (!username || !pwd || !title || !article)  {
        return alert('비어있는 입력란이 있습니다');
    }

    //아이디 비번 일치하는지 확인 -> 글 저장
    axios.post('/create/process1', { username, pwd })
        .then((res) => {
            const state = res.data.state;
            
            if (state === 'no-user') {
                alert("존재하지않는 username입니다");
            } else if (state === 'password-error') {
                alert("비밀번호가 틀렸습니다");

            //유저정보확인에 성공했을 경우 글 저장하기
            } else if (state === 'success') {
                alert("글 작성을 성공했습니다");
                axios.post('/create/process2', { title, article, username })
                .then((res) => {
                    event.target.username.value = '';
                    event.target.pwd.value = '';
                    event.target.title.value = '';
                    event.target.article.value = '';
                })
                .catch((err) => console.error(err));
            }
        })
        .catch((err) => console.error(err));
 

    
})