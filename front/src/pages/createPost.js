import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import { authContext } from "../App";

export default function CreatePost(){
    const navigate = useNavigate();
    const {auth} = useContext(authContext);
    
    function handleCreate(){
        const form = document.getElementById("postForm");
        const formData = new FormData(form);
        const formObject = Object.fromEntries(formData.entries());
        
        if(formObject.title === "" || formObject.content === "" || formObject.file ===" "){
            return;
        }else if(typeof formObject.title !== "string"){
            return console.log("Post TITLE was not a string")
        }else if(typeof formObject.content !== "string"){
            return console.log("Post CONTENT was not a string")
        }
       
        const settings = {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Authorization": auth.token,
            },
            body: formData,
        };

        fetch("http://localhost:3001/posts", settings)  
        .then(response => {
            response.json()
            if(response.status === 201){
                navigate("/home");
            }else{
                console.log(response)
            }
        })
    }
    
    return(
        <>
            <Link to={"/home"}>Home</Link> | {" "}
            <form id="postForm" encType="multipart/form-data">
                TITLE<input type="text" name="title" maxLength="50"/>
                CONTENT<input type="text" name="content" maxLength="1500" />
                IMAGE<input type="file" name="image" />
            </form>
            <button type="submit" onClick={handleCreate}>CREATE POST</button>
        </>
    )
}

