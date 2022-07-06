import React, { useContext } from "react";
import { authContext } from "../App";
import { useNavigate } from "react-router-dom";


const style = {
        background: "lemonchiffon",
        padding: "1em",
        width: "min-content",
        borderRadius: "10px",
        margin: "2em"
}
const container={
    display: "flex"
}

export default function LoginAndSignUp(){
    
    const {auth, setAuth} = useContext(authContext);
    const navigate = useNavigate();
    
    function handleLogin(){
        const loginForm = document.getElementById("loginForm");
        const user = Object.fromEntries(new FormData(loginForm).entries());
        const settings = {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user)
        };
    
        fetch("http://localhost:3001/auth/login", settings)
        .then(response => response.json())
        .then(data =>{
            if(data.token){
                setAuth({token:data.token, userId: data.userId})  // Add bearer token and userId to state variable
                navigate("/home");
            }
        })
    }

    function handleSignUp(){
        const signUpForm = document.getElementById("signUpForm");
        const user = Object.fromEntries(new FormData(signUpForm).entries());
        const {email, password} = user;
        const emailValidator = require("email-validator");
        const passwordValidator = require('password-validator');
        const schema = new passwordValidator();
        schema.is().min(8, "Password must contain a minimum of 8 characters");
        schema.is().max(15, "Password must be a maxiumum of 15 characters");
        schema.has().uppercase(2, "Password must contain at least 2 uppercase letters");
        schema.has().symbols(2, "Password must contain at least 2 symbols");
        let passwordCheck = schema.validate(password, {details: true});
        let emailCheck = emailValidator.validate(email); 

        if(passwordCheck !== true && emailCheck !== true){
            console.log("*** START OF ERROR ***");
            passwordCheck.forEach(error => console.log(error.message));
            console.log("Email format incorrect");
            console.log("*** END OF ERROR ***");
            return;
        }
        else if(passwordCheck !== true){
            console.log("*** START OF ERROR ***");
            passwordCheck.forEach(error => console.log(error.message));
            console.log("*** END OF ERROR ***");
            return;
            // set error on new state variable
            // log error message(s) to screen
        }else if(emailCheck !== true){
            console.log("Email format incorrect");
            return;
        }

        const settings = {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user)
        };
    
        fetch("http://localhost:3001/auth/signup", settings)
        .then(response => {
            if(response.status === 201){
                fetch("http://localhost:3001/auth/login", settings)
                .then(response => response.json())
                .then(data =>{
                    if(data.token){
                        setAuth({token:data.token, userId: data.userId})  // Add bearer token and userId to state variable
                        navigate("/home");
                    }
                })
            }
        })
    }
    
    return(
        <>
            <h1>GROUPOMANIA</h1>
                <div style={container}>
                <div style={style}>
                    <h2>LOGIN</h2>
                    <form id="loginForm">
                        EMAIL:<input type="text" name="email" />
                        PASSWORD:<input type="password" name="password" />
                    </form> 
                    <button type="submit" onClick={handleLogin}>LOGIN</button>
                </div>
                <div style={style}>
                    <h2>SIGN UP</h2>
                    <form id="signUpForm">
                        EMAIL:<input type="text" name="email" />
                        PASSWORD:<input type="password" name="password" />
                    </form> 
                    <button type="submit" onClick={handleSignUp}>SIGN UP</button>
                </div>
            </div>
        </>
    )
}