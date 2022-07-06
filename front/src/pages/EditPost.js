import React, { useContext, useState, useEffect } from "react";
import { authContext } from "../App";
import { useParams, useNavigate } from "react-router-dom";

export default function EditPost(){
    const {auth, setAuth} = useContext(authContext);
    const [post, setPost] = useState();
    const navigate = useNavigate();

    const params = useParams();
    const settings = {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization" : auth.token,
        },
    };

    useEffect(()=>{
        fetch(`http://localhost:3001/posts/${params.postId}`, settings)
                .then(response => response.json()) 
                .then(data => setPost(data)); 
    }, [])
    
    function handleEdit(){
        const form = document.getElementById("postForm");
        const formData = new FormData(form);
        formData.append("userId", auth.userId);

        const settings = {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Authorization" : auth.token,
            },
            body: formData,
        };
    
        fetch(`http://localhost:3001/posts/${params.postId}`, settings)
            .then(response => response.json()) 
            .then(data => {
                setPost(data);
                navigate("/home");
            }) 
    }

    return(
        <>
            {post && <>
            <form id="postForm" encType="multipart/form-data">
                    TITLE<input type="text" name="title" defaultValue={post.title}/>
                    CONTENT<input type="text" name="content" defaultValue={post.content}/>
                    <img alt="" src={post.imageUrl}></img>
                    IMAGE<input type="file" name="image"/>
                </form>
                <button type="submit" onClick={handleEdit}>EDIT POST</button>
            </>}
        </>
    )
}