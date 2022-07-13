import React from "react";
import { useNavigate } from "react-router-dom";

export default function LogOutButton(){
    const navigate = useNavigate();
    const settings = {
        method: "POST",
        credentials: "include",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
    };

    function handleLogOut(){
        fetch("http://localhost:3001/auth/logout", settings)
        .then(response => response.json());
        navigate("/");
        console.log("You have been logged out")
    }
    
    return(
        <button type="submit" onClick={handleLogOut}>LOGOUT</button>
    )
}