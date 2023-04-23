import "./share.scss";
import { AuthContext } from "../../context/authContext";
import { useContext, useState } from "react";
import Image from "../../assets/img.png";
import Map from "../../assets/map.png";
import Friend from "../../assets/friend.png";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios.js";
import axios from "axios";

const Share = () => {
    const [desc, setDesc] = useState(null);
    const [file, setFile] = useState("");
    const {currentUser} = useContext(AuthContext);
    
    const upload = async () => {
        try{
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", "socialife")
            const res = await axios.post("https://api.cloudinary.com/v1_1/dmydn76la/image/upload", formData);
            const { url } = res.data;
            return url;
        }catch(err){
            console.log(err);
        }
    }
    
    const queryClient = useQueryClient();
    const mutation = useMutation(
        (newPost) => {
            return makeRequest.post("/posts", newPost, {withCredentials: true});
        },
        {
            onSuccess: () => {queryClient.invalidateQueries(["posts"])}
        }
    )
        
    const  handleClick = async (e) => {
        e.preventDefault();
        let imgUrl = "";
        if(file) imgUrl = await upload();
        mutation.mutate({desc, img: imgUrl});
        setDesc("");
        setFile(null); 
    }
    
    return (
        <div className="share">
            <div className="container">
                <div className="top">
                    <div className="left">
                        <img src={currentUser.profilePhoto} alt="" />
                        <input type="text" placeholder={`what's on your mind ${currentUser.name}?`} onChange={(e) => setDesc(e.target.value)} value={desc}/>
                    </div>
                    <div className="right">
                        {file && (
                            <img src={URL.createObjectURL(file)} alt="" className="file" />
                        )}
                    </div>
                </div>
                <hr/>
                <div className="bottom">
                    <div className="left">
                        <input type="file" id="file" style={{display: "none"}} onChange={(e) => setFile(e.target.files[0])}/>   
                        <label htmlFor="file">
                            <div className="item">
                                <img src={Image} alt="" />
                                <span>Add Images</span>
                            </div>
                        </label>
                        <div className="item">
                            <img src={Map} alt="" />
                            <span>Add Places</span>
                        </div>
                        <div className="item">
                            <img src={Friend} alt="" />
                            <span>Tag Friends</span>
                        </div>
                    </div>
                    <div className="right">
                        <button onClick={handleClick}>Share</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Share;