import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/authContext";
import "./followers.scss";
import { Link } from "react-router-dom";

const Followers = () => {
    const { currentUser } = useContext(AuthContext);
    const { isLoading, error, data } = useQuery({
        queryKey: ["followers"],
        queryFn: () => makeRequest.get("/relationships/followers?userId="+currentUser.id)
        .then((res) => {
            return res.data;
        })
    });

    return (
        <div className="followers">
            {error 
                ?   "Something went wrong!"
                :   isLoading
                        ?   "loading..."
                        :   (data.length === 0)
                            ?   "No followers"
                            :   data.map(follower => (
                                    <Link to={`profile/${follower.userId}`} style={{textDecoration:"none"}}>
                                        <div className="follower">
                                            <img src={"/upload/"+follower.profilePhoto} alt="" />
                                            <span>{follower.name}</span>
                                        </div>
                                    </Link>
                                ))
            }
        </div>
    )
}

export default Followers;   