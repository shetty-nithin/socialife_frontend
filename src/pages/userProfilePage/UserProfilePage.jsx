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

const UserProfilePage = () => {
    return (
        <div className="userProfilePage">
            <div className="images">
                <img src="https://images.pexels.com/photos/614117/pexels-photo-614117.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className="cover" />
                <img src="https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className="profilePhoto" />
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
                        <span>Nithin Shetty</span>
                        <div className="info">
                            <div className="item">
                                <PlaceIcon/>
                                <span>India</span>
                            </div>
                            <div className="item">
                                <LanguageIcon/>
                                <span>Nithin.com</span>
                            </div>
                        </div>
                        <button>Follow</button>
                    </div>
                    <div className="right">
                        <EmailOutlinedIcon/>
                        <MoreVertIcon/>
                    </div>
                </div>
                <Posts/>
            </div>
        </div>
    )
}

export default UserProfilePage