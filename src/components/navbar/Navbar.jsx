import "./navbar.scss";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import MarkEmailUnreadOutlinedIcon from "@mui/icons-material/MarkEmailUnreadOutlined";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";
import { makeRequest } from "../../axios";
import Search from "../search/Search";

const Navbar = () => {
    const [logOutMenu, setLogOutMenu] = useState(false);
    const [searchList, setSearchList] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const navigate = useNavigate();

    const {toggle, darkMode} = useContext(DarkModeContext);
    const {currentUser} = useContext(AuthContext);
    
    const handleLogOut = async () => {
        try {
            await makeRequest.post("/auth/logout/"+currentUser.id);
            localStorage.removeItem("user");
            setLogOutMenu(false);
            navigate("/login");
        } catch (err) {
            console.log(err);
        }
    }

    const handleChange = (e) => {
        if(!e.target.value){
            setSearchInput("");
        }
        else setSearchInput({...searchInput, searchInput: e.target.value});
    }

    return (
        <div className="navbar">
            <div className="left">
                <Link to="/" style={{textDecoration: "none"}}>
                    <span>sociaLife</span>
                </Link>
                <HomeOutlinedIcon/>
                {darkMode ? <WbSunnyOutlinedIcon onClick={toggle}/> :  <DarkModeOutlinedIcon onClick={toggle}/>}
                <GridViewOutlinedIcon/>
                <div className="search">
                    <SearchOutlinedIcon/>
                    <input type="text" placeholder="Search..." onClick={() => setSearchList(!searchList)} onChange={handleChange}/>
                    {searchList && <Search searchInput={searchInput}/>}
                </div>
            </div>
            <div className="right">
                <Person2OutlinedIcon/>
                <MarkEmailUnreadOutlinedIcon/>
                <NotificationsActiveOutlinedIcon/>
                <div className="user">
                    <img src={"/upload/"+currentUser.profilePhoto} alt="" onClick={() => navigate(`/profile/${currentUser.id}`)}/>
                    <div className="logOut">
                        <span>{currentUser.username}</span>
                        {logOutMenu 
                            ?   <KeyboardDoubleArrowRightIcon onClick={() => setLogOutMenu(!logOutMenu)}/>
                            :   <KeyboardDoubleArrowLeftIcon onClick={() => setLogOutMenu(!logOutMenu)}/>}
                    </div>
                    {logOutMenu && <button className="logOutButton" onClick={handleLogOut}>Logout</button>}
                </div>
            </div>
        </div>
    )
}

export default Navbar;