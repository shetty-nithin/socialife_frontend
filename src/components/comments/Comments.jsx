import { useContext } from "react";
import "./comments.scss";
import {AuthContext} from "../../context/authContext";

const Comments = () => {

    const {currentUser} = useContext(AuthContext)

    //temp
    const comments = [
        {
            id: 1, 
            desc: "ipsum Lorem ipsum dolor sit amet consectetur",
            name: "John Wick",
            userId: 1, 
            profilePhoto: "https://images.pexels.com/photos/3314294/pexels-photo-3314294.jpeg?auto=compress&cs=tinysrgb&w=400",
        },
        {
            id: 2, 
            desc: "picture is very good.",
            name: "John Wick",
            userId: 2, 
            profilePhoto: "https://images.pexels.com/photos/3314294/pexels-photo-3314294.jpeg?auto=compress&cs=tinysrgb&w=400",
        }
    ];

    return(
        <div className="comments">
            <div className="writeComment">
                <img src={currentUser.profilePhoto} alt="" />
                <input type="text" placeholder="wirte your comment" />
                <button>Send</button>
            </div>
            {comments.map(comment => (
                <div className="comment">
                    <img src={comment.profilePhoto} alt="" />
                    <div className="info">
                        <span>{comment.name}</span>
                        <p>{comment.desc}</p>
                    </div>
                    <span className="date">1hr ago</span>
                </div>
            ))}
        </div>
    )
}

export default Comments;