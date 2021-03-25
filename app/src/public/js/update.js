"use strict";

document.getElementById('update-form').addEventListener('submit', (event) => {
    alert("hell0");
    event.preventDefault();
    const title = event.target.title.value;
    const article = event.target.article.value;
    const pwd = event.target.pwd.value;
    const qID = event.target.qID.value;
    

    //default 방지
    if (!title || !article || !pwd) {
        return alert('비어있는 입력란이 있습니다');
    }

    //우선 비밀번호만 보내서 맞는지 확인하기
    axios.post('/article/update1', { pwd, qID })
        .then((res) => {
            //비밀번호 일치하면 success=true
            const success = res.data.success;
            
            if (success === 'false') {
                alert("비밀번호가 일치하지 않습니다");
            } else {
                //비밀번호가 일치하면 qID랑 제목, 내용을 보냄
                axios.post('/article/update2', { qID, title, article })
                .then((res) => {
                    const success = res.data.success;
                    if (success === 'true') {
                        alert("수정에 성공하였습니다");
                        location.href="/";
                        
                    }
                })
            }
        })
    

    
})

