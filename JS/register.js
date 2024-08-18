let UserFirstName = document.querySelector("#User_First_Name")
let UserLastName = document.querySelector("#User_Last_Name")
let email = document.querySelector("#email")
let password = document.querySelector("#password")

let reg_btn = document.querySelector("#register_submit")


reg_btn.addEventListener("click", function(e){

    e.preventDefault()


    if(UserFirstName.value === "" || UserLastName.value=== ""  || email.value === ""  || password.value === "" ){
        alert("enter you data")
    }
    else{

        localStorage.setItem("UserFirstName",UserFirstName.value)
        localStorage.setItem("UserLastName",UserLastName.value)
        localStorage.setItem("email",email.value)
        localStorage.setItem("password",password.value)
       
        setTimeout( ()=>{
            window.location="login.html"
        },500)

    }








})