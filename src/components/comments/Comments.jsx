import { useContext, useState } from "react";
import "./comments.scss";
import { AuthContext } from "../../context/authContext";
import { useQuery, useMutation, useQueryClient  } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import moment from "moment";

const Comments = ({postId}) => {
    const [desc, setDesc] = useState("");

    const {currentUser} = useContext(AuthContext)
    const { isLoading, error, data } = useQuery({
        queryKey: ["comments"],
        queryFn: () => makeRequest.get("/comments?postId="+postId, {withCredentials: true})
        .then((res) => {
            return res.data
        })
    });

    const queryClient = useQueryClient();
    const mutation = useMutation(
       (newComment) => {
        return makeRequest.post("/comments", newComment, {withCredentials: true});
       },
       {
        onSuccess: () => {queryClient.invalidateQueries(["comments"])}
       }
    )

    const  handleClick = async (e) => {
       e.preventDefault();
       mutation.mutate({desc, postId});
       setDesc("");
    }

    return(
        <div className="comments">
            <div className="writeComment">
                <img src={currentUser.profilePhoto} alt="" />
                <input type="text" placeholder="wirte your comment" value={desc} onChange={(e) => setDesc(e.target.value)}/>
                <button onClick={handleClick}>Send</button>
            </div>
            {error 
                ?   "something went wrong"
                :   isLoading 
                        ?   "loading..."
                        :   data.map(comment => (
                                <div className="comment">
                                    <img src={comment.profilePhoto} alt="" />
                                    <div className="info">
                                        <span>{comment.name}</span>
                                        <p>{comment.desc}</p>
                                    </div>
                                    <span className="date">{moment(comment.createdAt).fromNow()}</span>
                                </div>
                            ))
            }
        </div>
    )
}

export default Comments;