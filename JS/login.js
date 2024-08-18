let email = document.querySelector("#email")
let password = document.querySelector("#password")
let login_btn = document.querySelector("#login_submit")

let getuseremail = localStorage.getItem("email")
let getuserpassword = localStorage.getItem("password")

login_btn.addEventListener("click" , function(e){
  
    e.preventDefault()

    if(getuseremail && getuseremail.trim() === email.value.trim() && getuserpassword && getuserpassword.trim() === password.value.trim()){


        setTimeout(()=>{

            window.location="index.html"

        },500)

    }

    else{
        alert("invalid username or pass")
    }

})




