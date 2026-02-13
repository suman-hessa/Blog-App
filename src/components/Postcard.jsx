import React from "react";
import appwriteServices from "../appwrite/conf.js";
import { Link } from "react-router";

function Postcard({$id, title, featuredImage}){
    <Link to={`/posts/${$id}`}>
        <div className="w-full bg-gray-100 p-4 rounded-xl">
            <div className="w-full mb-4">
                <img src={appwriteServices.getFilePreview(featuredImage)} alt={title} className=""/>
            </div>
            <h2 
            className="text-xl font-bold"
            >{title}
            </h2>
        </div>
    </Link>
}

export default Postcard;