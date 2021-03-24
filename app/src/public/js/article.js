"use strict";

document.getElementById('comment-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const text = event.target.text.value;
    const pwd = event.target.pwd.value;
    const articleNum = event.target.qID.value;
    

    //default 방지
    if (!username || !pwd || !text) {
        return alert('비어있는 입력란이 있습니다');
    }

    //우선 비밀번호만 보내서 맞는지 확인하기
    axios.post('/article/comment1', { username, pwd })
        .then((res) => {
            //비밀번호 일치하면 success=true
            const success = res.data.success;
            
            if (success === 'false') {
                alert("비밀번호가 일치하지 않습니다");
            } else {
                axios.post('/article/comment2', { username, text, articleNum })
                .then((res) => {
                    //댓글 작성에 성공하면 success=true
                    const success = res.data.success;

                    if (success === 'true') {
                        alert("댓글 작성에 성공했습니다");
                        location.reload();
                    } else {
                        alert("알 수 없는 이유로 댓글 작성에 실패하였습니다");
                    }
                })
            }
        })
    

    
})