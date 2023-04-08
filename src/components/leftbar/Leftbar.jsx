import "./leftbar.scss";
import Friends from "../../assets/1.png";
import Groups from "../../assets/2.png"
import Market from "../../assets/3.png"
import Watch from "../../assets/4.png"
import Memories from "../../assets/5.png"
import Events from "../../assets/6.png"
import Gaming from "../../assets/7.png"
import Gallery from "../../assets/8.png"
import Video from "../../assets/9.png"
import Messages from "../../assets/10.png"
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import Followers from "../followers/Follower";

const Leftbar = () => {
    const [followersList, setFollowersList] = useState(false)
    const {currentUser} = useContext(AuthContext);
    const navigate = useNavigate();

    return (
        <div className="leftbar">
            <div className="container">
                <div className="menu">
                    <div className="user" onClick={() => navigate("/")}>
                        <img src={"/upload/"+currentUser.profilePhoto} alt=""/>
                        <span>{currentUser.name}</span>
                    </div>
                    <div className="item" style={{cursor: "pointer"}}>
                        <img src={Friends} alt="" />
                        <span onClick={() => setFollowersList(!followersList)}>Followers</span>
                        {followersList && <Followers/>}
                    </div>
                    <div className="item">
                        <img src={Groups} alt="" />
                        <span>Groups</span>
                    </div>
                    <div className="item">
                        <img src={Market} alt="" />
                        <span>Marketplace</span>
                    </div>
                    <div className="item">
                        <img src={Watch} alt="" />
                        <span>Watch</span>
                    </div>
                    <div className="item">
                        <img src={Memories} alt="" />
                        <span>Memories</span>
                    </div>
                </div>
                <hr/>
                <div className="menu">
                    <span>Your shortcuts</span>
                    <div className="item">
                        <img src={Events} alt="" />
                        <span>Events</span>
                    </div>
                    <div className="item">
                        <img src={Gaming} alt="" />
                        <span>Gaming</span>
                    </div>
                    <div className="item">
                        <img src={Gallery} alt="" />
                        <span>Gallery</span>
                    </div>
                    <div className="item">
                        <img src={Video} alt="" />
                        <span>Video</span>
                    </div>
                    <div className="item">
                        <img src={Messages} alt="" />
                        <span>Messages</span>
                    </div>
                </div>
                <hr/>
            </div>
        </div>
    )
}

export default Leftbar;