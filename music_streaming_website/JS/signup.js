function signup(){
    event.preventDefault();
    const userName = document.getElementById("name").value;
    const userId = document.getElementById("id").value;
    const userPw1 = document.getElementById("pw1").value;
    const userPw2 = document.getElementById("pw2").value;

    if(userPw1===userPw2){
        if(userName===""){
            alert('닉네임을 입력해주세요..');
            return;
        }
        else if(userId===""){
            alert('아이디를 입력해주세요..');
            return;
        }
        else if(userPw1.length<6){
            alert("비밀번호는 6자리 이상입니다..");
            return;
        }
        else{
            localStorage.setItem('name',userName);
            localStorage.setItem('userId',userId);
            localStorage.setItem('userPw',userPw1);
            alert("회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.")
            window.location.href = "login.html";
        }
    }
    else{
        alert("비밀번호가 일치하지 않습니다..");
        location.reload();
    }
}