let login = (event) =>{
    event.preventDefault();
    const userId = document.getElementById("id").value;
    const userPw = document.getElementById("pw").value;
    const wrongDiv = document.getElementById("wrong_msg");

    const id = localStorage.getItem("userId");
    const pw = localStorage.getItem("userPw");
    
   if(id!=null){
        if(userId===id&&userPw==pw){
            if(document.getElementById("remember_id").checked){
                remember_id();
            } else{
                localStorage.removeItem("remember_id");
            }
            if(document.getElementById("auto_login").checked){
                remember_id_pw();
            } else{
                localStorage.removeItem("auto_login");
            }
            go_main();
        }
        else{
            wrongDiv.textContent = "id 혹은 비밀번호를 잘못 입력하셨습니다."
            clear();
        }
    }
    else{
        wrongDiv.textContent = "id 혹은 비밀번호를 잘못 입력하셨습니다."
        clear();
    }
}


window.onload = function(){
    const remember_id = localStorage.getItem("remember_id");
    const auto_login = localStorage.getItem("auto_login");

    if(remember_id){
        const id = localStorage.getItem("userId");
        document.getElementById("id").value = id;
        document.getElementById("remember_id").checked = true;
      }

    if(auto_login){
        const id = localStorage.getItem("userId");
        const pw = localStorage.getItem("userPw");
        document.getElementById("id").value = id;
        document.getElementById("pw").value = pw;
        document.getElementById("auto_login").checked = true;
        login(event);
    }
}

function remember_id(){
    localStorage.setItem("remember_id",true);
}

function remember_id_pw(){
    remember_id();
    localStorage.setItem("auto_login",true);
}

function go_main(){
    sessionStorage.setItem('login','true');
    window.location.href = "main.html";
}

function clear(){
    document.getElementById("id").value = "";
    document.getElementById("pw").value = "";
}

function clickEye(){
    const eyeImg = document.querySelector(".eye");

    if(pw.type === "password"){
        pw.type = "text";
        eyeImg.src = "./images/eye_close.svg";
    }
    else{
        pw.type = "password";
        eyeImg.src = "./images/eye_open.svg";
    }
}