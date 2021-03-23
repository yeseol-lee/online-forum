"use strict";

console.log("연결 확인");

document.getElementById('register-form').addEventListener('submit', async(event) => {
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
    try {
        await axios.post('/register/process', { username, pwd });
    } catch (err) {
        console.error(err);
    }

    console.log(username, pwd, pwd2);
})