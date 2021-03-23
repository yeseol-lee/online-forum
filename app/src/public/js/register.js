"use strict";

document.getElementById('register-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const pwd = event.target.pwd.value;
    const pwd2 = event.target.pwd2.value;

    //default 방지
    if (!username || !pwd || !pwd2) {
        return alert('비어있는 입력란이 있습니다');
    }
    //비밀번호 2개 같은지 확인
    if (pwd !== pwd2) {
        return alert('비밀번호가 같지 않습니다');
    }
    
    //서버로 데이터 보내기
    axios.post('/register/process', { username, pwd })
        .then((res) => {
            //유저명 겹치지않으면 true를 받음
            if (res.data.success === "true") {
                alert("유저 등록에 성공하였습니다");
            } else {
                alert("이미 존재하는 유저명입니다");
            }
            event.target.username.value = '';
            event.target.pwd.value = '';
            event.target.pwd2.value = '';
        })
        .catch((err) => console.error(err));

    
})