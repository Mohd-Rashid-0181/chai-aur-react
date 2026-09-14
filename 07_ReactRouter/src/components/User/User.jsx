import React from "react";
import { useParams } from "react-router-dom";


function User() {
    const {userId} = useParams()
    return (
         <div className=" bg-gray-500 text-white text-3xl pt-16 pb-16 min-h/2-screen flex items-center justify-center">
            <h1 className="text-3xl font-bold">
                User ID: {userId}
            </h1>
        </div> 
    );
}

export default User;