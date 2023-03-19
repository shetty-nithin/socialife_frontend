import "./post.scss";
import FavoriteBorderoutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined"
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {Link} from "react-router-dom";
import Comments from "../comments/Comments";
import { useState } from "react";

const Post = ({post}) => {
    const [commentsOpen, setCommentsOpen] = useState(false);
    //temp
    const liked = false;
    return(
        <div className="post">
            <div className="container">
                <div className="user">
                    <div className="userInfo">
                        <img src={post.profilePhoto} alt="" />
                        <div className="details">
                            <Link to={`profilePage/${post.userId}`} style={{textDecoration:"none", color:"inherit"}}>
                                <span className="name">{post.name}</span>
                            </Link>
                            <span className="date">1 min ago</span>
                        </div>
                    </div>
                    <MoreHorizIcon/>
                </div>
                <div className="content">
                    <p>{post.desc}</p>
                    <img src={post.profilePhoto} alt="" />
                </div>
                <div className="info">
                    <div className="item">
                        {liked ? <FavoriteOutlinedIcon/> : <FavoriteBorderoutlinedIcon/>}
                        12 Likes
                    </div>
                    <div className="item" onClick={()=>setCommentsOpen(!commentsOpen)}>
                        <TextsmsOutlinedIcon/>
                        4 Comments
                    </div>
                    <div className="item">
                        <ShareOutlinedIcon/>
                        Share
                    </div>
                </div>
                {commentsOpen && <Comments/>}
            </div>
        </div>
    ) 
}

export default Post;