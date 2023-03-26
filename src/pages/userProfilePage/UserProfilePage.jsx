import "./UserProfilePage.scss"
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Place from "@mui/icons-material/Place";
import Posts from "../../components/posts/Posts";
import Update from "../../components/update/Update";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";

const UserProfilePage = () => {
    const [openUpdate, setOpenUpdate] = useState(false);

    const { currentUser } = useContext(AuthContext);
    const userId = parseInt(useLocation().pathname.split("/")[2]);

    const { isLoading, error, data } = useQuery({
        queryKey: ["user"],
        queryFn: () => makeRequest.get("/users/find/"+userId)
        .then((res) => {
            return res.data
        })
    });

    const {isLoading: rIsLoading, data: relationshipData} = useQuery({
        queryKey: ["relationship"],
        queryFn: () => makeRequest.get("/relationships?followedUserId="+userId)
        .then((res) => {
            return res.data
        })
    });


    const queryClient = useQueryClient();
    const mutation = useMutation(
       (follwing) => {
        if(follwing) return makeRequest.delete("/relationships?userId="+ userId);
        return makeRequest.post("/relationships", {userId});
       },
       {
        onSuccess: () => {queryClient.invalidateQueries(["relationship"])}
       }
    )

    const handleFollow = () => {
        mutation.mutate(relationshipData.includes(currentUser.id));
    }

    return (
        <div className="userProfilePage">
            {isLoading 
                ? "loading..." 
                :   <>
                        <div className="images">
                            <img src={"/upload/"+data.coverPhoto} alt="" className="cover"/>
                            <img src={"/upload/"+data.profilePhoto} alt="" className="profilePhoto"/>
                        </div>
                        <div className="profileContainer">
                            <div className="uInfo">
                                <div className="left">
                                    <a href="https://www.linkedin.com/in/shetty-nithin/">
                                        <FacebookTwoToneIcon fontSize="large"/>
                                    </a>
                                    <a href="https://www.linkedin.com/in/shetty-nithin/">
                                        <InstagramIcon fontSize="large"/>
                                    </a>
                                    <a href="https://www.linkedin.com/in/shetty-nithin/">
                                        <LinkedInIcon fontSize="large"/>
                                    </a>
                                    <a href="https://www.linkedin.com/in/shetty-nithin/">
                                        <TwitterIcon fontSize="large"/>
                                    </a>
                                </div>
                                <div className="mid">
                                    <span>{data.name}</span>
                                    <div className="info">
                                        <div className="item">
                                            <PlaceIcon/>
                                            <span>{data.city}</span>
                                        </div>
                                        <div className="item">
                                            <LanguageIcon/>
                                            <span>{data.website}</span>
                                        </div>
                                    </div>
                                    {rIsLoading
                                        ?   "loading..."
                                        :    (userId === currentUser.id) 
                                            ?   <button onClick={() => setOpenUpdate(true)}>Update</button> 
                                            :   <button onClick={handleFollow}>
                                                    {relationshipData.includes(currentUser.id)
                                                        ?   "Unfollow"
                                                        :   "Follow"}
                                                </button>
                                    }
                                </div>
                                <div className="right">
                                    <EmailOutlinedIcon/>
                                    <MoreVertIcon/>
                                </div>
                            </div>
                            <Posts userId={userId}/>
                        </div>
                    </>
            }
            {openUpdate && <Update setOpenUpdate={setOpenUpdate} user={data}/>}
        </div>
    )
}

export default UserProfilePage