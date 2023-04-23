import { useState } from "react";
import { makeRequest } from "../../axios";
import "./update.scss";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";

const Update = ({setOpenUpdate, user}) => {
    const [texts, setTexts] = useState({
        // email: user.email,
        // password: user.password,
        name: user.name,
        city: user.city,
        website: user.website
    });
    const [cover, setCover] = useState(null);
    const [profile, setProfile] = useState(null);

    const upload = async (file) => {
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

    const handleChange = (e) => {   
        setTexts((prev) => ({...prev, [e.target.name]: [e.target.value]}))
    }

    const queryClient = useQueryClient();
    const mutation = useMutation(
        (user) => {
            return makeRequest.put("/users", user, {withCredentials: true});
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["user"]);
            }
        }
    )

    const  handleClick = async (e) => {
        e.preventDefault();
        let coverURL; 
        let profileURL;
        coverURL = cover ? await upload(cover) : user.coverPhoto;
        profileURL = profile ? await upload(profile) : user.profilePhoto;
        
        mutation.mutate({...texts, coverPhoto: coverURL, profilePhoto: profileURL});
        setOpenUpdate(false);
        setCover(null);
        setProfile(null);
    }
    
return (
    <div className="update">
        <div className="wrapper">
            <h1>Update Your Profile</h1>
            <form>
                <div className="files">
                    <label htmlFor="cover">
                        <span>Cover Picture</span>
                        <div className="imgContainer">
                            <img src={cover ? URL.createObjectURL(cover) : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} alt="" />
                            <CloudUploadIcon className="icon" />
                        </div>
                    </label>
                    <input type="file" id="cover" style={{display: "none"}} onChange={(e) => setCover(e.target.files[0])}/>
                    <label htmlFor="profile">
                        <span>Profile Picture</span>
                        <div className="imgContainer">
                            <img src={profile ? URL.createObjectURL(profile) : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} alt=""/>
                            <CloudUploadIcon className="icon" />
                        </div>
                    </label>
                    <input type="file" id="profile" style={{ display: "none" }} onChange={(e) => setProfile(e.target.files[0])}/>
                </div>
                {/* <label>Email</label>
                <input type="text" value={texts.email} name="email" onChange={handleChange}/> */}
                {/* <label>Password</label>
                <input type="text" value={texts.password} name="password" onChange={handleChange}/> */}
                <label>Name</label>
                <input type="text"value={texts.name}name="name"onChange={handleChange}/>
                <label>Country / City</label>
                <input type="text" name="city" value={texts.city} onChange={handleChange}/>
                <label>Website</label>
                <input type="text" name="website" value={texts.website} onChange={handleChange}/>
                <button onClick={handleClick}>Update</button>
            </form>
            <button className="close" onClick={() => setOpenUpdate(false)}>close</button>
        </div>
    </div>
  );
}

export default Update;