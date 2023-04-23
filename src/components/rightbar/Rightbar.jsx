import { useContext} from "react";
import { makeRequest } from "../../axios";
import "./rightbar.scss";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../../context/authContext";

const Rightbar = () => {
    const { currentUser } = useContext(AuthContext);
    const {isLoading, error, data} = useQuery({
        queryKey: ["friendsOnline"],
        queryFn: () => makeRequest.get("/relationships/followed?userId="+currentUser.id, {withCredentials: true})
        .then((res) => {
            return res.data;
        }),
        staleTime: 0,
        cacheTime: 0
    });

    const { isLoading: suggIsLoading, error: suggError, data: suggData } = useQuery({
        queryKey: ["suggestion"],
        queryFn: () => makeRequest.get("relationships/suggestions?userId="+currentUser.id, {withCredentials: true})
        .then((res) => {
            return res.data;
        }),
        staleTime: 0,
        cacheTime: 0,
    });

    const queryClient = useQueryClient();
    const mutation = useMutation(
        (userId) => {
            return makeRequest.post("/relationships", {userId}, {withCredentials: true});
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["suggestion"]);
                queryClient.invalidateQueries(["friendsOnline"]);
                queryClient.invalidateQueries(["posts"]);
            }
        }
    )

    const handleFollow = (suggUserId) => {
        mutation.mutate(suggUserId);
    }
    
    return (
        <div className="rightbar">
            <div className="container">
                <div className="item">
                    <span>Suggestion for you</span>
                    {suggError 
                        ?   "Something went wrong!"
                        :   suggIsLoading
                                ?   "loading..."
                                :   (suggData.length === 0)
                                    ?   <><br/> "No Suggestions"</>
                                    :   suggData.map(suggestedUser => (
                                            <div className="user" key={suggestedUser.finalFollowedUserId}>
                                                <div className="userInfo">
                                                    <img src={suggestedUser.profilePhoto} alt="" />
                                                    <span>{suggestedUser.name}</span>
                                                </div>
                                                <div className="buttons">
                                                    <button onClick={() => handleFollow(suggestedUser.finalFollowedUserId)}>follow</button>
                                                </div>
                                            </div>
                                        ))
                    }
                </div>
                <div className="item">
                    <span>Latest Activities</span>
                    <div className="user">
                        <div className="userInfo">
                            <img src={currentUser.profilePhoto} alt="" />
                            <p>
                                <span>{currentUser.name}</span>
                                <br />
                                has updated profile photo
                            </p>
                        </div>
                        {/* <span>1min ago</span> */}
                    </div>
                </div>
                <div className="item">
                    <span>Friends Online</span>
                        {error 
                            ?   "Something went wrong!"
                            :   isLoading
                                    ?   "loading..."
                                    :   (data.length === 0)
                                        ?   <><br/> "No Friends" </>
                                        :   data.map(friend => (
                                                <div className="user online" key={friend.id}>
                                                    <div className="userInfo">
                                                        <img src={friend.profilePhoto} alt="" />
                                                        <div className="online"/>
                                                        <span>{friend.name}</span>
                                                    </div>
                                                </div>
                                            ))
                        }
                </div>
            </div>
        </div>
    )
}

export default Rightbar;