import Post from "../post/Post";
import "./posts.scss";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { useNavigate } from "react-router-dom";

const Posts = ({userId}) => {
    const { isLoading, error, data } = useQuery({
        queryKey: ["posts"],
        queryFn: () => makeRequest.get("/posts?userId="+userId, {withCredentials: true})
        .then((res) => {
            return res.data
        })
    });
    const navigate = useNavigate();
    if(error){
        navigate("/login");
    }
    
    return(
        <div className="posts">
            {error  ?   "Something went wrong!"
                    :   isLoading 
                            ?   "loading..."
                            :   data.map(post => (
                                    <Post post={post} key={post.id}/>
                                ))
            }
        </div>
    )
}

export default Posts;