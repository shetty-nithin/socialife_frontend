import "./post.scss";
import FavoriteBorderoutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined"
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {Link} from "react-router-dom";
import Comments from "../comments/Comments";
import { useContext, useState } from "react";
import moment from "moment";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/authContext";

const Post = ({post}) => {
    const [commentsOpen, setCommentsOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const { currentUser } = useContext(AuthContext); 

    const { isLoading, data } = useQuery({ // { isLoading, error, data }
        queryKey: ["likes", post.id],
        queryFn: () => makeRequest.get("/likes?postId="+post.id, {withCredentials: true})
        .then((res) => {
            return res.data
        })
    });

    const queryClient = useQueryClient();
    const mutation = useMutation(
       (liked) => {
        if(liked) return makeRequest.delete("/likes?postId="+ post.id, {withCredentials: true});
        return makeRequest.post("/likes", {postId : post.id}, {withCredentials: true});
       },
       { onSuccess: () => {queryClient.invalidateQueries(["likes"])}}
    )
    const handleLike = () => {
        mutation.mutate(data.includes(currentUser.id));
    }

    const deleteMutation = useMutation(
       (postId) => {
        return makeRequest.delete("/posts/"+postId, {withCredentials: true});
       },
       { onSuccess: () => {queryClient.invalidateQueries(["posts"])}}
    )
    const handleDelete = () => {
        setMenuOpen(!menuOpen);
        deleteMutation.mutate(post.id);
    }

    return(
        <div className="post">
            <div className="container">
                <div className="user">
                    <div className="userInfo">
                        <img src={post.profilePhoto} alt="" />
                        <div className="details">
                            <Link to={`profile/${post.userId}`} style={{textDecoration:"none", color:"inherit"}}>
                                <span className="name">{post.name}</span>
                            </Link>
                            <span className="date">{moment(post.createdAt).fromNow()}</span>
                        </div>
                    </div>
                    <MoreHorizIcon onClick={() => setMenuOpen(!menuOpen)}/>
                    {menuOpen && post.userId === currentUser.id && <button onClick={handleDelete}>delete</button>}
                </div>
                <div className="content" onClick={() => setMenuOpen(false)}>
                    <p>{post.desc}</p>
                    <img src={post.img} alt="" />
                </div>
                <div className="info">
                    <div className="item">
                        {isLoading
                            ?   "loading..."
                            :   data.includes(currentUser.id) 
                                ?   <FavoriteOutlinedIcon style={{color: "red"}} onClick={handleLike}/> 
                                :   <FavoriteBorderoutlinedIcon onClick={handleLike}/>}
                        {data?.length} Likes
                    </div>
                    <div className="item" onClick={()=>setCommentsOpen(!commentsOpen)}>
                        <TextsmsOutlinedIcon/>
                        Comments
                    </div>
                    <div className="item">
                        <ShareOutlinedIcon/>
                        Share
                    </div>
                </div>
                {commentsOpen && <Comments postId={post.id}/>}
            </div>
        </div>
    ) 
}

export default Post;